import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";
import { HookContext } from "@feathersjs/feathers";
import { authorize } from "feathers-casl";
import { defineAbilitiesFor } from "../../authentication.abilities";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [authenticate("jwt"), authorize({ adapter: "feathers-nedb" })],
    get: [
      authenticate("jwt"),
      // possible solution?:
      // (context: HookContext) => {
      //   const { user } = context.params;
      //   if (user) context.params.ability = defineAbilitiesFor(user as any);
      //   return context;
      // },
      authorize({ adapter: "feathers-nedb" }),
    ],
    create: [hashPassword("password")],
    update: [
      hashPassword("password"),
      authenticate("jwt"),
      authorize({ adapter: "feathers-nedb" }),
    ],
    patch: [
      hashPassword("password"),
      authenticate("jwt"),
      authorize({ adapter: "feathers-nedb" }),
    ],
    remove: [authenticate("jwt"), authorize({ adapter: "feathers-nedb" })],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [authorize({ adapter: "feathers-nedb" })],
    get: [authorize({ adapter: "feathers-nedb" })],
    create: [],
    update: [authorize({ adapter: "feathers-nedb" })],
    patch: [authorize({ adapter: "feathers-nedb" })],
    remove: [authorize({ adapter: "feathers-nedb" })],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
