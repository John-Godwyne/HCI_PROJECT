export function AvatarGroup({ count, going }) {
  const imgs = [1, 2, 3];
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {imgs.map((i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/48?img=${i + 10}`}
            alt=""
            className="w-7 h-7 rounded-full border-2 border-white object-cover"
          />
        ))}
      </div>
      <span className="ml-2 text-xs font-medium text-slate-500">+{going ?? count} going</span>
    </div>
  );
}
