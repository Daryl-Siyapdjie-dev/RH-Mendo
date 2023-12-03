interface checkProps{
    checked:boolean;
    onChange:(value:string)=>void;
    label:string
}
export function CheckBox({checked,onChange,label}:checkProps){
    return <div>
        <input
        type="checkbox"
        checked={checked}
        onChange={(e)=>onChange(e.target.checked)}
        className=""
        />
    </div>
}