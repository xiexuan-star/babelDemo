import parser from '@babel/parser';
import { traverse, File } from '@babel/core';

const sourceCode = `
    let name: string;

    name = 111;
`;

function resolveType(targetType) {
  const tsTypeAnnotationMap = {
    'TSStringKeyword': 'string'
  };
  switch (targetType.type) {
    case 'TSTypeAnnotation':
      return tsTypeAnnotationMap[targetType.typeAnnotation.type];
    case 'NumberTypeAnnotation':
      return 'number';
  }
}

const ast = parser.parse(sourceCode, { plugins: ['typescript'] });

traverse(ast, {
  AssignmentExpression(path, state) {
    const leftBinding = path.scope.getBinding(path.get('left'));
    const leftType = leftBinding.path.get('id').getTypeAnnotation();
    const rightType = path.get('right').getTypeAnnotation();

    if (resolveType(leftType) === resolveType(rightType)) return;
    // wrong type
    path.get('right').buildCodeFrameError('err', Error);
  }
});
