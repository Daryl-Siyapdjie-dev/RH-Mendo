interface inputProps{
    type:'text' | 'password' | 'email';
    placeholder:string;
    value:string;
    onChange:(value:string)=>void;
}
export function Input({type,placeholder, value, onChange}:inputProps ){
    return <div>
        <input
        type={type}
        className="w-96 placeholder:italic focus:outline-none focus:ring focus:ring-violet-300  p-2 border border-gray-300 rounded-xl pl-4 mt-2  "
        value={value}
        placeholder={placeholder}
        onChange={(e)=>onChange(e.target.value)}
        />
        
        
    </div>
}