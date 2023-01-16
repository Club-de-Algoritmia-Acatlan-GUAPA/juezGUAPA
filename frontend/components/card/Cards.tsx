import Ty from "@components/typography/typography"

interface CardsProps {
    title: string,
    content: string,
}
export default function Card({
    title = "Prueba",
    content = ""
}: CardsProps) {

    return (
        <>
            <div key={title} className=" 
            bg-[var(--primary-bg-color)]
            rounded-[var(--border-radius)]
            ">
                <div className="
            text-center 
            bg-[var(--secondary-bg-color)]
            rounded-t-[var(--border-radius)]
            ">
                    <Ty type="h2" weight="black">
                        {title}
                    </Ty>
                </div>
                <div className="
            p-[var(--primary-padding)]
                ">
                    {content}
                </div>
            </div>
        </>
    )
}
