1. Install Typescript:
    ```
    npm install -g typescript
    ```    
    
2. Install tsd and package-to-tsd
    ```
    npm install -g tsd
    npm install -g package-to-tsd
    ```
    
3. Update definition files
    ```    
    package-to-tsd 
    ```

4. Create tsconfig.json
    ```
    {
        "compilerOptions": {
            "module": "commonjs",
            "sourceMap": true
        }    
    }
    ```

5. Create autocompiler task
    ```
    F1 >> Tasks: Configure Task Runner >> TypeScript - Watch Mode
    ```
    
6. Enable javascript source maps to allow debugging in TypeScript
    6.1. Modify launch.json
    ```
    Set configurations.sourceMaps = true
    ```        

7. Start coding in TypeScript (.ts files)
