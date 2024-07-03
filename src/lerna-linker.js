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
exports.linkPackagesSource = linkPackagesSource;
exports.linkPackagesTarget = linkPackagesTarget;
exports.unlinkPackagesTarget = unlinkPackagesTarget;
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const execPromise = util_1.default.promisify(child_process_1.exec);
function linkPackagesSource() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Unlinking all existing packages.");
        let outputUnlink = { stdout: "", stderr: "" };
        try {
            outputUnlink = yield execPromise("yarn run lerna exec --no-bail yarn unlink");
        }
        catch (err) {
            console.error(err);
        }
        fs_1.default.writeFileSync(`${path_1.default.join(__dirname, "../logs/stdoutLinkSource.txt")}`, outputUnlink.stdout);
        fs_1.default.writeFileSync(`${path_1.default.join(__dirname, "../logs/stderrLinkSource.txt")}`, outputUnlink.stderr);
        console.log("Linking local packages.");
        let outputLink = { stdout: "", stderr: "" };
        try {
            outputLink = yield execPromise("yarn run lerna exec --no-bail yarn link");
        }
        catch (err) {
        }
        fs_1.default.appendFileSync(`${path_1.default.join(__dirname, "../logs/stdoutLinkSource.txt")}`, outputLink.stdout);
        fs_1.default.appendFileSync(`${path_1.default.join(__dirname, "../logs/stderrLinkSource.txt")}`, outputLink.stderr);
        let outputAllPackages = { stdout: "", stderr: "" };
        try {
            outputAllPackages = yield execPromise("yarn run lerna ls");
            // Remove first two and last lines as they contain irrelevant output
            const output = outputAllPackages.stdout.split("\n");
            const packages = output.slice(2, output.length - 2);
            outputAllPackages.stdout = packages.join('\n');
        }
        catch (err) {
        }
        fs_1.default.writeFileSync(`${path_1.default.join(__dirname, "../logs/packages.txt")}`, outputAllPackages.stdout);
        fs_1.default.appendFileSync(`${path_1.default.join(__dirname, "../logs/stderrLinkSource.txt")}`, outputAllPackages.stderr);
        console.log(`Logs saved to ${path_1.default.join(__dirname, "..", "logs")}.`);
        console.log(`Saved linked packages to ${path_1.default.join(__dirname, "..", "logs", "package.txt")}.`);
        console.log(`Run <lerna-linker linkTarget> in the repository you want to use the linked packages in.`);
    });
}
function linkPackagesTarget() {
    return __awaiter(this, void 0, void 0, function* () {
        const packages = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "logs/packages.txt"), 'utf-8').trim().split('\n');
        for (const comunicaPackage of packages) {
            try {
                yield execPromise(`yarn link ${comunicaPackage}`);
            }
            catch (err) {
                console.error(err);
            }
        }
        console.log(`Linked ${packages.length} packages`);
    });
}
function unlinkPackagesTarget() {
    return __awaiter(this, void 0, void 0, function* () {
        const packages = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "logs/packages.txt"), 'utf-8').split('\n');
        for (const comunicaPackage of packages) {
            try {
                yield execPromise(`yarn unlink ${comunicaPackage}`);
            }
            catch (err) {
                console.error(err);
            }
        }
        console.log(`Unlinked ${packages.length} packages`);
    });
}
