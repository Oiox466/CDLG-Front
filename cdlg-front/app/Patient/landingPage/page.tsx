import FirstMain from "@/app/components/MainParts/First/firstMain";
import SecondMain from "@/app/components/MainParts/Second/secondMain";
import NavBar from "@/app/components/NavBar/navBar";

export default function LandingPage() {
    return (
        <main>
            <NavBar
                links={[
                    { label: "Registrate", href: "Patient/register" },
                    { label: "Conocenos", href: "/#" }
                ]}
            />
            <FirstMain/>
            <SecondMain/>
        </main>
    );
}