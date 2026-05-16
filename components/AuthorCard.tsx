interface AuthorCardProps {
  name: string;
  role: string;
  bio: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AuthorCard({
  name,
  role,
  bio,
  twitterUrl,
  linkedinUrl,
}: AuthorCardProps) {
  return (
    <div className="border border-[#e9ecef] p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {getInitials(name)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-zinc-900">{name}</span>
            <span className="text-zinc-500 text-sm">{role}</span>
          </div>
          <p className="text-zinc-600 text-sm mt-1">{bio}</p>
          {(twitterUrl || linkedinUrl) && (
            <div className="flex items-center gap-3 mt-3">
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  Twitter
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
