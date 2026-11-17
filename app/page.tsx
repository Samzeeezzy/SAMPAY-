"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, Menu, X, Plus, Minus, ArrowRight, Trash2, Sparkles } from "lucide-react";

type Product = { id:number; name:string; category:string; price:number; oldPrice?:number; image:string; tag?:string; description:string };

const products:Product[] = [
  {id:1,name:"The Everyday Tote",category:"Accessories",price:28500,oldPrice:35000,image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7",tag:"BESTSELLER",description:"A considered everyday carryall with a timeless silhouette."},
  {id:2,name:"Sculpted Ceramic Set",category:"Home & Living",price:42000,image:"https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",tag:"NEW ARRIVAL",description:"Quietly beautiful forms for slow mornings and warm evenings."},
  {id:3,name:"Minimal Timepiece",category:"Lifestyle",price:68500,oldPrice:79000,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30",description:"An understated finishing touch, made to move with you."},
  {id:4,name:"Linen Lounge Shirt",category:"Fashion",price:39500,image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10",tag:"LIMITED",description:"Relaxed tailoring in a breathable, beautifully soft finish."},
  {id:5,name:"Modern Carryall",category:"Accessories",price:52000,image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa",description:"A refined companion for workdays and weekends."},
  {id:6,name:"Amber Home Fragrance",category:"Home & Living",price:19500,image:"https://images.unsplash.com/photo-1603006905003-be475563bc59",description:"A warm, inviting scent that makes a space feel like yours."},
  {id:7,name:"Classic Optical Frames",category:"Lifestyle",price:33000,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083",description:"Clean lines and a confident, everyday profile."},
  {id:8,name:"Weekend Essentials",category:"Fashion",price:46500,image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b",tag:"CURATED",description:"Easy pieces selected for effortless personal style."}
];

const money=(value:number)=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(value);

export default function Home(){
  const [category,setCategory]=useState("All");
  const [search,setSearch]=useState("");
  const [searchOpen,setSearchOpen]=useState(false);
  const [cartOpen,setCartOpen]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const [cart,setCart]=useState<Record<number,number>>({});
  const [email,setEmail]=useState("");
  const [subscribed,setSubscribed]=useState(false);
  const [notice,setNotice]=useState("");

  const filtered=useMemo(()=>products.filter(p=>(category==="All"||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase())),[category,search]);
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const total=products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0);
  const add=(id:number)=>{setCart(c=>({...c,[id]:(c[id]||0)+1}));setNotice("Added to your bag");window.setTimeout(()=>setNotice(""),1800)};
  const change=(id:number,delta:number)=>setCart(c=>{const next={...c,[id]:Math.max(0,(c[id]||0)+delta)};if(!next[id])delete next[id];return next});
  const categories=["All","Fashion","Accessories","Home & Living","Lifestyle"];

  return <main>
    <div className="bg-[#171713] px-4 py-2.5 text-center text-[9px] tracking-[2px] text-[#f8f5ed] sm:text-[10px]">A LITTLE LUXURY, EVERY DAY &nbsp;·&nbsp; COMPLIMENTARY DELIVERY ON ORDERS OVER ₦100,000</div>
    <header className="sticky top-0 z-30 border-b border-[#e7e3d9] bg-[#fffefa]/95 backdrop-blur">
      <div className="container flex h-[76px] items-center justify-between">
        <button className="md:hidden" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen?<X/>:<Menu/>}</button>
        <nav className="hidden items-center gap-7 md:flex"><a className="text-[10px] uppercase tracking-[1.5px] hover:text-[#b89a62]" href="#shop">Shop</a><a className="text-[10px] uppercase tracking-[1.5px] hover:text-[#b89a62]" href="#story">Our story</a><a className="text-[10px] uppercase tracking-[1.5px] hover:text-[#b89a62]" href="#journal">Journal</a></nav>
        <a href="#" className="serif text-[27px] font-bold tracking-[5px]">SAM<span className="text-[#b89a62]">PAY</span></a>
        <div className="flex items-center gap-4"><button onClick={()=>setSearchOpen(!searchOpen)} aria-label="Search"><Search size={19}/></button><button className="relative" onClick={()=>setCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={19}/><span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#b89a62] px-1 text-[9px] text-white">{count}</span></button></div>
      </div>
      <AnimatePresence>{searchOpen&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden border-t border-[#e7e3d9]"><div className="container flex items-center gap-3 py-4"><Search size={17}/><input autoFocus value={search} onChange={e=>{setSearch(e.target.value);document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})}} placeholder="Search the collection..." className="w-full bg-transparent text-sm outline-none"/><button onClick={()=>{setSearch("");setSearchOpen(false)}}><X size={17}/></button></div></motion.div>}</AnimatePresence>
      <AnimatePresence>{mobileOpen&&<motion.nav initial={{height:0}} animate={{height:"auto"}} exit={{height:0}} className="overflow-hidden border-t border-[#e7e3d9] px-6 md:hidden"><div className="flex flex-col gap-5 py-6 text-xs uppercase tracking-widest"><a href="#shop" onClick={()=>setMobileOpen(false)}>Shop</a><a href="#story" onClick={()=>setMobileOpen(false)}>Our story</a><a href="#journal" onClick={()=>setMobileOpen(false)}>Journal</a></div></motion.nav>}</AnimatePresence>
    </header>

    <section className="relative overflow-hidden bg-[#e9e5dc]">
      <div className="container grid min-h-[590px] items-center gap-10 py-14 md:grid-cols-[.9fr_1.1fr] md:py-20">
        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="relative z-10 max-w-[490px]">
          <p className="eyebrow mb-6">THE SAMPAY EDIT · 001</p>
          <h1 className="serif text-[54px] leading-[1.04] tracking-[-2px] sm:text-[68px]">The art of<br/><em className="font-medium text-[#a88a55]">everyday.</em></h1>
          <p className="mt-7 max-w-[370px] text-sm leading-7 text-[#6d6b63]">Thoughtfully selected essentials for the way you live, work and unwind. Discover pieces that make ordinary moments feel exceptional.</p>
          <div className="mt-9 flex flex-wrap gap-3"><a className="btn-dark inline-flex items-center gap-3" href="#shop">Explore collection <ArrowRight size={14}/></a><a className="btn-light" href="#story">Our philosophy</a></div>
          <div className="mt-14 flex items-center gap-3 text-[9px] uppercase tracking-[2px] text-[#77776e]"><span className="h-px w-9 bg-[#b89a62]"/> Considered living, curated for you</div>
        </motion.div>
        <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:1}} className="relative mx-auto w-full max-w-[570px]">
          <div className="absolute -right-5 -top-5 h-36 w-36 border border-[#b89a62]/60 sm:-right-8 sm:-top-8 sm:h-48 sm:w-48"/>
          <div className="relative h-[390px] overflow-hidden sm:h-[490px]"><img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="Curated boutique interior"/></div>
          <div className="float absolute -bottom-5 -left-5 bg-[#fffefa] px-6 py-5 shadow-xl sm:-left-10"><Sparkles size={17} className="mb-2 text-[#b89a62]"/><p className="serif text-lg">Simply considered.</p><p className="mt-1 text-[9px] uppercase tracking-widest text-[#77776e]">A better kind of everyday</p></div>
        </motion.div>
      </div>
    </section>

    <section className="border-y border-[#e7e3d9] bg-[#fffefa] py-5"><div className="container grid grid-cols-2 gap-5 text-center sm:grid-cols-4"><div><p className="serif text-lg">Curated</p><p className="mt-1 text-[9px] uppercase tracking-widest text-[#858176]">Not ordinary</p></div><div><p className="serif text-lg">Quality first</p><p className="mt-1 text-[9px] uppercase tracking-widest text-[#858176]">Made to matter</p></div><div><p className="serif text-lg">Easy shopping</p><p className="mt-1 text-[9px] uppercase tracking-widest text-[#858176]">Simple by design</p></div><div><p className="serif text-lg">Nigeria-wide</p><p className="mt-1 text-[9px] uppercase tracking-widest text-[#858176]">Delivery available</p></div></div></section>

    <section id="shop" className="container py-20">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow mb-3">THE COLLECTION</p><h2 className="serif text-4xl sm:text-5xl">Find your <em className="text-[#b89a62]">favourites.</em></h2><p className="mt-3 text-sm text-[#77776e]">A thoughtful edit of things worth keeping.</p></div><p className="text-[10px] uppercase tracking-[1.5px] text-[#77776e]">{filtered.length} pieces to discover</p></div>
      <div className="mb-8 flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`border px-4 py-2.5 text-[9px] uppercase tracking-[1.4px] transition ${category===c?"border-[#171713] bg-[#171713] text-white":"border-[#d9d4c9] text-[#68665e] hover:border-[#b89a62]"}`}>{c}</button>)}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-2 sm:gap-x-7 lg:grid-cols-4">{filtered.map((p,i)=><motion.article key={p.id} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{delay:i*.06}} className="product-card group">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4dc]"><img className="product-image h-full w-full object-cover" src={p.image+"?auto=format&fit=crop&w=700&q=80"} alt={p.name}/>{p.tag&&<span className="absolute left-3 top-3 bg-[#fffefa] px-2.5 py-1.5 text-[8px] tracking-[1.4px]">{p.tag}</span>}<button onClick={()=>add(p.id)} className="absolute bottom-3 left-3 right-3 translate-y-3 bg-[#171713]/95 py-3 text-[9px] uppercase tracking-[1.6px] text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">Add to bag +</button><button onClick={()=>add(p.id)} className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center bg-[#fffefa] text-[#171713] sm:hidden"><Plus size={16}/></button></div>
        <div className="pt-4"><p className="text-[8px] uppercase tracking-[1.6px] text-[#9a927f]">{p.category}</p><h3 className="serif mt-1 text-[16px] sm:text-lg">{p.name}</h3><p className="mt-2 text-xs font-semibold">{money(p.price)} {p.oldPrice&&<span className="ml-2 text-[10px] font-normal text-[#99948a] line-through">{money(p.oldPrice)}</span>}</p></div>
      </motion.article>)}</div>
      {filtered.length===0&&<div className="py-16 text-center text-sm text-[#77776e]">No pieces found. Try another search.</div>}
    </section>

    <section id="story" className="bg-[#ded9ce] py-20"><div className="container grid items-center gap-12 md:grid-cols-2"><div className="overflow-hidden"><img className="h-[360px] w-full object-cover sm:h-[470px]" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" alt="Warm, considered living space"/></div><div className="max-w-[460px]"><p className="eyebrow mb-4">A DIFFERENT KIND OF STORE</p><h2 className="serif text-4xl leading-tight sm:text-5xl">Less noise.<br/><em className="text-[#a88a55]">More meaning.</em></h2><p className="mt-6 text-sm leading-7 text-[#6d6b63]">At SAMPAY, we believe the things around us should earn their place. That is why we bring together useful, beautiful and thoughtfully chosen pieces that add something special to everyday life.</p><a href="#shop" className="mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[1.6px]">Discover the edit <ArrowRight size={15}/></a></div></div></section>

    <section id="journal" className="container py-20 text-center"><p className="eyebrow mb-4">THE SAMPAY LETTER</p><h2 className="serif text-4xl">A little inspiration, <em className="text-[#b89a62]">delivered.</em></h2><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#77776e]">Be first to hear about new arrivals, thoughtful edits and special offers.</p><form onSubmit={e=>{e.preventDefault();if(email.includes("@"))setSubscribed(true)}} className="mx-auto mt-8 flex max-w-[470px] border-b border-[#bdb8aa]"><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-2 py-4 text-sm outline-none"/><button className="px-3 text-[9px] uppercase tracking-[1.6px]"> {subscribed?"You're in!":"Subscribe →"}</button></form></section>

    <footer className="bg-[#171713] pb-7 pt-14 text-[#f6f4ee]"><div className="container grid gap-10 border-b border-white/15 pb-12 sm:grid-cols-2 md:grid-cols-4"><div><a href="#" className="serif text-3xl font-bold tracking-[5px]">SAM<span className="text-[#b89a62]">PAY</span></a><p className="mt-4 max-w-[220px] text-xs leading-6 text-white/55">Thoughtfully selected essentials, delivered with style.</p></div><div><p className="mb-4 text-[9px] uppercase tracking-[2px] text-[#b89a62]">Explore</p><div className="flex flex-col gap-3 text-xs text-white/65"><a href="#shop">Shop all</a><a href="#story">Our story</a><a href="#journal">Journal</a></div></div><div><p className="mb-4 text-[9px] uppercase tracking-[2px] text-[#b89a62]">Customer care</p><div className="flex flex-col gap-3 text-xs text-white/65"><a href="mailto:hello@sampay.store">Contact us</a><a href="#shop">Shipping information</a><a href="#shop">Returns & exchanges</a></div></div><div><p className="mb-4 text-[9px] uppercase tracking-[2px] text-[#b89a62]">Stay connected</p><p className="text-xs leading-6 text-white/60">Follow the SAMPAY edit for new finds and everyday inspiration.</p></div></div><div className="container flex flex-col items-center justify-between gap-3 pt-6 text-[9px] tracking-wider text-white/45 sm:flex-row"><p>© {new Date().getFullYear()} SAMPAY. All rights reserved.</p><p>Developed by <a className="text-[#c4a675] hover:text-white" href="https://samkonceptz.vercel.app/" target="_blank" rel="noreferrer">SamKonceptz Enterprise</a> · <a className="text-[#c4a675]" href="https://wa.me/2347068860965" target="_blank" rel="noreferrer">+234 706 886 0965</a></p></div></footer>

    <AnimatePresence>{cartOpen&&<><motion.button aria-label="Close cart backdrop" className="fixed inset-0 z-40 bg-black/40" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setCartOpen(false)}/><motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"tween",duration:.3}} className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col bg-[#fffefa] shadow-2xl"><div className="flex items-center justify-between border-b border-[#e7e3d9] px-6 py-5"><div><p className="eyebrow">YOUR SELECTION</p><h2 className="serif mt-1 text-2xl">Shopping bag ({count})</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Close cart"><X/></button></div><div className="flex-1 overflow-y-auto px-6">{products.filter(p=>cart[p.id]).map(p=><div key={p.id} className="flex gap-4 border-b border-[#e7e3d9] py-5"><img src={p.image+"?auto=format&fit=crop&w=200&q=75"} alt={p.name} className="h-24 w-20 object-cover"/><div className="flex flex-1 flex-col"><p className="serif text-lg">{p.name}</p><p className="mt-1 text-xs">{money(p.price)}</p><div className="mt-auto flex items-center justify-between"><div className="flex items-center gap-3 border border-[#e7e3d9] px-2 py-1"><button onClick={()=>change(p.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span className="text-xs">{cart[p.id]}</span><button onClick={()=>change(p.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div><button onClick={()=>setCart(c=>{const n={...c};delete n[p.id];return n})} aria-label="Remove item" className="text-[#99948a]"><Trash2 size={15}/></button></div></div></div>)}</div>{count===0?<div className="flex flex-1 flex-col items-center justify-center text-center"><ShoppingBag size={32} className="text-[#b89a62]"/><p className="serif mt-4 text-2xl">Your bag is waiting.</p><p className="mt-2 text-xs text-[#77776e]">Find something you'll love.</p><button className="btn-dark mt-6" onClick={()=>setCartOpen(false)}>Continue shopping</button></div>:<div className="border-t border-[#e7e3d9] px-6 py-6"><div className="mb-4 flex justify-between text-sm"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="mb-4 text-[10px] leading-5 text-[#77776e]">Shipping and taxes are calculated at checkout. Secure Paystack checkout will be connected in the next integration stage.</p><button className="btn-dark w-full" onClick={()=>setNotice("Checkout is being prepared. Paystack will be connected after secure server setup.")}>Continue to checkout · {money(total)}</button></div>}</motion.aside></>}</AnimatePresence>
    <AnimatePresence>{notice&&<motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}} className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 bg-[#171713] px-5 py-3 text-xs text-white shadow-xl">{notice}</motion.div>}</AnimatePresence>
  </main>;
}