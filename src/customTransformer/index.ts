import * as ts from "typescript";
import { notStrictEqual } from "assert";

const targets = process.argv.slice(2);

const program = ts.createProgram(targets, {});
program.emit(undefined, undefined, undefined, undefined, {
  before: [transformerFactory],
});

function transformerFactory(context: ts.TransformationContext) {
  return (sourceFile: ts.SourceFile) => {
    return ts.visitNode(sourceFile, transformer(context));
  };
}

function transformer(context: ts.TransformationContext): ts.Visitor {
  function visitor(node: ts.Node): ts.Node {
    if (ts.isCallExpression(node)) {
      if (node.expression.getText() === "console.log") {
        return ts.createNode(ts.SyntaxKind.NotEmittedStatement);
      }
    }
    return ts.visitEachChild(node, visitor, context);
  }

  return visitor;
}
