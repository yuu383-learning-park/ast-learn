import * as ts from "typescript";

function astFactory(message: string) {
  return [
    ts.createExpressionStatement(ts.createCall(
      ts.createPropertyAccess(
        ts.createIdentifier("console"),
        ts.createIdentifier("log")
      ),
      undefined,
      [ts.createStringLiteral(message)]
    ))
  ];
}