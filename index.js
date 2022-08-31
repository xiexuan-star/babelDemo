import t from '@babel/types';
import parser from '@babel/parser';
import template from '@babel/template';

console.log(template.expression(`(function (){})()`)());
