'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
	const router = useRouter();
	const { data: session } = useSession();

	return (
		<div className="relative m-0 block h-full w-screen p-[5px]">
			<Image src="/img/banner.jpg" alt="Sports facility banner" fill priority className="object-cover" />
			<div className="relative top-[100px] z-20 mx-auto w-fit max-w-[calc(100%-2rem)] rounded-lg bg-black/10 px-4 py-2 text-center text-white">
				<h1 className="text-3xl font-semibold">where every sport finds its facility</h1>
				<h3 className="text-xl font-serif">Finding the perfect sports facility has never been easier.</h3>
			</div>
			{session && (
				<div className="z-30 absolute top-5 right-10 rounded-lg bg-white/10 px-2 py-1 font-semibold text-cyan-800 text-xl">
					Welcome {session.user?.name}
				</div>
			)}
			<button
				className="absolute bottom-6 right-6 z-30 m-2 rounded border border-cyan-600 bg-white px-5 py-3 text-xl font-semibold text-cyan-600 hover:border-transparent hover:bg-cyan-600 hover:text-white"
				onClick={() => {
					router.push('/facilities')
				}}
			>
				Select Facility NOW
			</button>
		</div>
	);
}
