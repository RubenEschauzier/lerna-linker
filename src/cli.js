#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const lerna_linker_1 = require("./lerna-linker");
yargs_1.default
    .command('linkSource', 'Link the packages in the source repository', function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, lerna_linker_1.linkPackagesSource)();
    });
})
    .command('linkTarget', 'Consume previously linked packages in target repository', function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, lerna_linker_1.linkPackagesTarget)();
    });
})
    .command('unlinkTarget', 'Remove all symlinks in target repository', function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, lerna_linker_1.unlinkPackagesTarget)();
    });
})
    .demandCommand()
    .help()
    .argv;
