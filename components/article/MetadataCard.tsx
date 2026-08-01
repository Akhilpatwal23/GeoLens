type Props={

title:string;

items:string[];

}

export default function MetadataCard({

title,

items

}:Props){

return(

<div className="rounded-xl border p-5">

<h3 className="font-semibold mb-3">

{title}

</h3>

<div className="flex flex-wrap gap-2">

{items.map(item=>(

<span

key={item}

className="rounded-full bg-gray-100 px-3 py-1 text-sm"

>

{item}

</span>

))}

</div>

</div>

);

}