import * as url from 'url';

import { ArgsParser, OptionParser, pathUtils } from 'growi-commons';

export class LsxContext {

  constructor() {
    this.currentPagePath = null;
    this.tagExpression = null;
    this.fromPagePath = null;
    this.lsxArgs = null;

    // initialized after parse()
    this.isParsed = null;
    this.pagePath = null;
    this.options = null;
  }

  parse() {
    if (this.isParsed) {
      return;
    }

    // initialize
    let specifiedPath;

    const parsedResult = ArgsParser.parse(this.lsxArgs);
    this.options = parsedResult.options;

    // determine specifiedPath
    // order:
    //   1: lsx(prefix=..., ...)
    //   2: lsx(firstArgs, ...)
    //   3: fromPagePath
    specifiedPath =
        this.options.prefix ||
        ((parsedResult.firstArgsValue === true) ? parsedResult.firstArgsKey : undefined) ||
        this.fromPagePath;

    // resolve pagePath
    //   when `fromPagePath`=/hoge and `specifiedPath`=./fuga,
    //        `pagePath` to be /hoge/fuga
    //   when `fromPagePath`=/hoge and `specifiedPath`=/fuga,
    //        `pagePath` to be /fuga
    //   when `fromPagePath`=/hoge and `specifiedPath`=undefined,
    //        `pagePath` to be /hoge
    this.pagePath = (specifiedPath !== undefined) ?
      decodeURIComponent(url.resolve(pathUtils.addTrailingSlash(this.fromPagePath), specifiedPath)):
      this.fromPagePath;

    this.isParsed = true;
  }

  getOptDepth() {
    if (this.options.depth == undefined) {
      return undefined;
    }
    return OptionParser.parseRange(this.options.depth);
  }

}
