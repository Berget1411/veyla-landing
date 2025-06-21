export function HeroBackground() {
  return (
    <div className='absolute inset-0 -z-10'>
      <div className='absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50' />
      <div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: `
            linear-gradient(rgba(14, 164, 122, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 164, 122, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
