import {Navbar} from "@/components/layout/Navbar";
import Image from "next/image";
import user from "../../public/images/navbar/user.png"
import {getProfileInfo} from "@/lib/db/profile";

export default async function Profile() {
    const profile = await getProfileInfo();

    return(
        <>
            <Navbar/>
            <div className="flex justify-center items-center pt-30">
                <div>
                    <Image
                        src={user}
                        alt="User Image"
                        height={150}
                        width={150}
                        className="mx-auto"
                    />
                    <div className="text-center pt-5">
                        <p className="text-4xl font-bold">{profile?.username ?? "Unbekannter User"}</p>
                        <p>Registriert seit: {" "} {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("de-DE") : "Unbekannt"} </p>
                    </div>
                </div>
            </div>
        </>
    )
}