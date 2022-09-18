import t from '@babel/types';
import parser from '@babel/parser';
import template from '@babel/template';

// console.log(template.expression(`(function (){})()`)());

import { Parser,TokenType } from 'acorn';

Parser.acorn.keywordTypes["xuan"] = new TokenType("xuan",{keyword: "xuan"});
const IParser = Parser.extend(noisyReadToken)

const result = IParser.parse('xuan function foo(){ }', { ecmaVersion: 'latest' })
console.log(result);

// ------------------------------------ 一个简易acorn插件实现 ---------------------------------
/**
 * @param {Parser} Parser
 */
function noisyReadToken(Parser) {
  return class IParser extends Parser {
    readToken(code) {
      console.log('read token=>',code);
      return super.readToken(code);
    }

    parse(program) {
      let newKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super";
      newKeywords += " xuan";// 增加一个关键字
      this.keywords = new RegExp("^(?:" + newKeywords.replace(/ /g, "|") + ")$")

      return(super.parse(program));
    }

    parseStatement(context, topLevel, exports) {
      const tokenType = this.type;

      if (tokenType === Parser.acorn.keywordTypes["xuan"]) {
        return this.parseXuanStatement(this.startNode())
      }
      else {
        return(super.parseStatement(context, topLevel, exports));
      }
    }

    parseXuanStatement(node) {
      this.next();
      return this.finishNode({value: 'xuan'},'XuanStatement');
    };
  };
}


