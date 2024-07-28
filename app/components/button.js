import Link from "next/link"

export default function Button(props){
return(
        <Link href={props.link}>
            <button className="bg-blue-300 px-5 py-3 w-52 text-3xl font-medium rounded-xl">
                {props.name}   
            </button>
        </Link>
    )
}