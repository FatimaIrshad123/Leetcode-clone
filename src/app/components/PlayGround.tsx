import PreferenceNavbar from "./PreferenceNavbar";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
export default function PlayGround(){
    return (
        <div className="flex flex-col bg-dark-layer-1 relative">
            <PreferenceNavbar />
            <Split className="h-[calc(100vh-34px)]" direction="vertical" sizes={[60,40]} minSize={60}>
                <div className="w-full overflow-auto">
                    <CodeMirror 
                    value="const a-1"
                    theme={vscodeDark}
                    extensions={[javascript()]}/>
                </div>

            </Split>
        </div>
    )
}