interface inputProps{
    type:'text' | 'password' | 'email';
    placeholder:string;
    value:string;
    onChange:(e:string)=>void;
}
export function Input({type,placeholder, value, onChange}:inputProps ){
    return <div>
        <input
        type={type}
        className="input w-96  "
        value={value}
        placeholder={placeholder}
        onChange={(e)=>onChange(e.target.value)}
        />
        
        
    </div>
}