import type { CHAT_PROFILE_QUERY_RESULT } from "@/sanity.types";

export function Chat({
	profile: _profile,
}: {
	profile: CHAT_PROFILE_QUERY_RESULT | null;
}) {
	return <div>Chat</div>;
}

export default Chat;
