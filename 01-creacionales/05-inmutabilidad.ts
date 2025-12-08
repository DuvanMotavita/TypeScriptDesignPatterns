/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsavedChanges: boolean;

    constructor(content: string, cursorPosition: number, unsavedChanges: boolean){
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsavedChanges = unsavedChanges;
    }

    copyWith({
        content,
        cursorPosition,
        unsavedChanges
    }:Partial<CodeEditorState>){
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsavedChanges ?? this.unsavedChanges
        )
    }


    displayState(){
        console.log('\n %cEditor State:',COLORS.green);
        console.log(`
            Content: ${this.content}
            cursorPosition: ${this.cursorPosition}
            unsavedChanges: ${this.unsavedChanges}
        `);
    }
}

class CodeEditorHistory {
    private history: CodeEditorState[] = [];
    private currentIndex: number = -1;

    save(state: CodeEditorState):void{
       
        if(this.currentIndex < this.history.length -1){
            this.history = this.history.slice(0, this.currentIndex +1);
        }
        this.history.push(state);
        this.currentIndex++;
    } 

    undo():CodeEditorState | null{
        if(this.currentIndex > 0){
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    redo():CodeEditorState | null{
        if(this.currentIndex < this.history.length -1){
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }

}

function main():void{
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState("console.log('Hello World');",2,false);
    history.save(editorState);
    console.log('%cInitial State:',COLORS.cyan);
    editorState.displayState();

    editorState = editorState.copyWith({content:"console.log('Hello, TypeScript!');\n console.log('New line!');",cursorPosition:25,unsavedChanges:true});
    history.save(editorState);
    console.log('\n%cAfter Edit:',COLORS.blue);
    editorState.displayState();

    editorState = editorState.copyWith({cursorPosition:5});
    history.save(editorState);
    console.log('\n%cAfter move the cursor:',COLORS.blue);
    editorState.displayState();

    console.log('\n%cAfter the undo:',COLORS.blue);
    editorState = history.undo()!;
    editorState.displayState();

    console.log('\n%cAfter the redo:',COLORS.blue);
    editorState = history.redo()!;
    editorState.displayState();
}


main();
