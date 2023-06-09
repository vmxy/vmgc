{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "ESNext", //ESNext
    "target": "ESNext",
    "lib": ["DOM", "ESNext"],
    "strict": false,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "isolatedModules": true,
    "resolveJsonModule": true,
    "noUnusedLocals": false,
    "strictNullChecks": false,
    "forceConsistentCasingInFileNames": true,

    "allowJs": true /* Allow javascript files to be compiled. */,
    "checkJs": true /* Report errors in .js files. */,
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    "removeComments": true /* Do not emit comments to output. */,
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    "downlevelIteration": true /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */,
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
    // "noImplicitAny": true,                    /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
    /* Additional Checks */
    "noUnusedParameters": false /* Report errors on unused parameters. */,
    "skipLibCheck": true,
    "noImplicitReturns": true /* Report error when not all code paths in function return a value. */,
    "noFallthroughCasesInSwitch": true /* Report errors for fallthrough cases in switch statement. */,
    /* Module Resolution Options */
    "rootDirs": ["src"],
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */
    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    /* Experimental Options */
    "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
    "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */,

    "paths": {
      "~/*": ["./*"],
      "@/*": ["./src/*"]
    },
    "types": [
      "vite/client",
      "node",
      "unplugin-icons/types/vue",
      "naive-ui/volar",
      "unplugin-vue-define-options/macros-global"
    ],
    //"include": ["src/**/*", "worker/**/*"],
    "exclude": ["node_modules", "dist", "public"]
  }
}
