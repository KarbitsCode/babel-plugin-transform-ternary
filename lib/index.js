import babelTemplate from './template.js';

/*
 * Ternary operator is part of conditional
 * expression, if-else keywords are parts of
 * if statement. How can we turn expressions into
 * statements? The answer is IIFE.
 *
 * Sure IIFEs can bloat generated code easily,
 * but currently there is no other way to maintain
 * execution order yet without the verbosity.
 * And mixed expressions surely make it harder.
 *
 * With the "do expressions" proposal landing,
 * this can be improve. Now we should just stick
 * to IIFEs.
 *
 */
const convert = () => {
  const template = babelTemplate(`
if (TEST) {
  return CONSEQUENT;
} else {
  return ALTERNATE;
}
`);
  const IIFEtemplate = babelTemplate(`
(function() {
  if (TEST) {
    return CONSEQUENT;
  } else {
    return ALTERNATE;
  }
}())
`);

  const Plugin = {
    visitor: {
      ConditionalExpression(path) {
        const parent = path.parentPath;
        const isExpressionOnly = parent.isForStatement()
          || parent.isVariableDeclarator({ init: path.node })
          || parent.isAssignmentExpression({ right: path.node })
          || parent.isCallExpression()
          || parent.isBinaryExpression()
          || parent.isLogicalExpression()
          || parent.isObjectProperty()
          || parent.isArrayExpression();

        const {
          node: {
            test,
            consequent,
            alternate,
          },
        } = path;

        if (isExpressionOnly) {
          path.replaceWith(
            IIFEtemplate({
              TEST: test,
              CONSEQUENT: consequent,
              ALTERNATE: alternate,
            })
          );
        } else {
          path.replaceWith(
            template({
              TEST: test,
              CONSEQUENT: consequent,
              ALTERNATE: alternate,
            })
          );
        }
      },
    },
  };

  return Plugin;
};

export default convert;
