import { ExtractSubjectType, MongoQuery, Subject, SubjectRawRule } from '@casl/ability';
import { Ability, AbilityBuilder, createAliasResolver, makeAbilityFromRules } from 'feathers-casl';


// don't forget this, as `read` is used internally
const resolveAction = createAliasResolver({
  update: 'patch', // define the same rules for update & patch
  read: ['get', 'find'], // use 'read' as a equivalent for 'get' & 'find'
  delete: 'remove', // use 'delete' or 'remove'
});

type User = {
  email: string;
}

const defineRulesFor = (
  user: User,
): SubjectRawRule<string, ExtractSubjectType<Subject>, MongoQuery<unknown>>[] => {
  // also see https://casl.js.org/v5/en/guide/define-rules

  const { can, rules } = new AbilityBuilder(Ability);

  can('get', 'users');
  can('find', 'users');

  // can('manage', 'all');

  return rules;
};

const defineAbilitiesFor = (user: User): Ability => {
  const rules = defineRulesFor(user);

  return makeAbilityFromRules(rules, { resolveAction });
};

export { defineAbilitiesFor, defineRulesFor };
