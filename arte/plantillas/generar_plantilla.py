import sys
from PIL import Image, ImageDraw, ImageFont
T=16; COLS,ROWS=10,8
UNE=(43,217,107,255); AIRE=(255,59,127,255); APOYO=(255,210,63,255); OPC=(150,150,160,255)
# (col,row): (nombre, aire=set de lados N E S W, muesca=None|'NE'..., opcional, grupo)
L={}
def t(c,r,n,aire="",mu=None,opc=False,apoyo=False): L[(c,r)]=dict(n=n,aire=set(aire),mu=mu,opc=opc,apoyo=apoyo)
# A terreno
t(0,0,"A1 esq. sup. izq","NW"); t(1,0,"A2 borde sup","N"); t(2,0,"A2b borde sup (var)","N"); t(3,0,"A2c borde sup (var)","N",opc=True); t(4,0,"A3 esq. sup. der","NE")
t(0,1,"A4 borde izq","W");   t(1,1,"A5 relleno"); t(2,1,"A5b relleno (var)"); t(3,1,"A5c relleno (var)",opc=True); t(4,1,"A6 borde der","E")
t(0,2,"A7 esq. inf. izq","SW"); t(1,2,"A8 borde inf","S"); t(2,2,"A8b borde inf (var)","S",opc=True); t(3,2,"A8c borde inf (var)","S",opc=True); t(4,2,"A9 esq. inf. der","SE")
t(6,0,"A10 interior (hueco abajo-der)",mu="SE"); t(7,0,"A11 interior (hueco abajo-izq)",mu="SW")
t(6,1,"A12 interior (hueco arriba-der)",mu="NE"); t(7,1,"A13 interior (hueco arriba-izq)",mu="NW")
t(6,3,"A4b borde izq (var)","W",opc=True); t(7,3,"A6b borde der (var)","E",opc=True)
# B plataforma
t(0,5,"B1 plataforma izq","NSW"); t(1,5,"B2 plataforma centro","NS"); t(2,5,"B2b plataforma centro (var)","NS",opc=True); t(3,5,"B3 plataforma der","NSE")
# C muro adobe
t(5,5,"C1 muro remate","N"); t(6,5,"C1b muro remate (var)","N",opc=True)
t(5,6,"C2 muro relleno"); t(6,6,"C2b muro relleno (var)"); t(7,6,"C2c muro relleno (var)",opc=True)
# D pasto
t(0,7,"D1 pasto","NEW",apoyo=True); t(1,7,"D2 pasto","NEW",apoyo=True); t(2,7,"D3 pasto (var)","NEW",apoyo=True,opc=True)

def edge(d,x0,y0,side,col,dashed,skip=None):
    pts=[]
    for i in range(T):
        p={'N':(x0+i,y0),'S':(x0+i,y0+T-1),'W':(x0,y0+i),'E':(x0+T-1,y0+i)}[side]
        pts.append((i,p))
    for i,p in pts:
        if dashed and i%2: continue
        if skip and skip(i): continue
        d.point(p,fill=col)

def draw(img):
    d=ImageDraw.Draw(img)
    for (c,r),v in L.items():
        x0,y0=c*T,r*T
        if v['opc']:
            for i in range(0,T,3):
                for p in [(x0+i,y0),(x0+i,y0+T-1),(x0,y0+i),(x0+T-1,y0+i)]: d.point(p,fill=OPC)
            # marcas por encima del contorno opcional
        for s in "NESW":
            if s in v['aire']: edge(d,x0,y0,s,AIRE,False)
            elif s=='S' and v['apoyo']: edge(d,x0,y0,s,APOYO,False)
            else:
                skip=None
                mu=v['mu']
                if mu and s in mu:
                    # en el lado del hueco, los ultimos 5 px junto a la esquina son aire
                    far = (mu[1]=='E') if s in 'NS' else (mu[0]=='S')
                    skip=(lambda i,far=far: i>=T-5) if far else (lambda i: i<5)
                edge(d,x0,y0,s,UNE,True,skip)
        if v['mu']:
            mu=v['mu']; cx=x0+(T-1 if mu[1]=='E' else 0); cy=y0+(T-1 if mu[0]=='S' else 0)
            dx=-1 if mu[1]=='E' else 1; dy=-1 if mu[0]=='S' else 1
            for i in range(5):
                d.point((cx+dx*i,cy),fill=AIRE); d.point((cx,cy+dy*i),fill=AIRE)
    return img

g=draw(Image.new("RGBA",(COLS*T,ROWS*T),(0,0,0,0)))
g.save(sys.argv[1]+"/plantilla_tiles_zona1.png")

# Leyenda ampliada
S=8; W,H=COLS*T*S, ROWS*T*S
big=Image.new("RGBA",(W,H+330),(24,24,30,255))
bg=Image.new("RGBA",(COLS*T,ROWS*T),(0,0,0,0)); db=ImageDraw.Draw(bg)
grp={'A':(120,70,50,90),'B':(150,110,60,90),'C':(180,150,90,90),'D':(90,140,70,90)}
for (c,r),v in L.items(): db.rectangle([c*T,r*T,c*T+T-1,r*T+T-1],fill=grp[v['n'][0]])
bg.alpha_composite(g)
big.alpha_composite(bg.resize((W,H),Image.NEAREST))
d=ImageDraw.Draw(big)
try: f=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",14); fb=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",22)
except Exception: f=fb=ImageFont.load_default()
import textwrap
for (c,r),v in L.items():
    x,y=c*T*S+12,r*T*S+14
    for k,line in enumerate(textwrap.wrap(v['n'],14)): d.text((x,y+k*18),line,fill=(240,240,240),font=f)
for gname,(c,r) in {"A · Terreno (laterita)":(0,3),"B · Plataforma (se cruza desde abajo)":(0,4),"C · Muro de adobe (fondo)":(5,4),"D · Pasto (detalle encima del suelo)":(3,7)}.items():
    d.text((c*T*S+12,r*T*S+(40 if r!=7 else 50)),gname,fill=(255,255,255),font=fb)
y=H+20
for col,txt in [(UNE,"punteado verde: se une con otro tile; el dibujo debe continuar sin corte"),(AIRE,"línea rosa: da al aire; aquí va el borde visible"),(APOYO,"línea amarilla: se apoya sobre el suelo"),(OPC,"contorno gris punteado: variante opcional (déjalo vacío si no la quieres)")]:
    d.rectangle([20,y+4,60,y+20],fill=col); d.text((75,y),txt,fill=(235,235,235),font=fb); y+=44
d.text((20,y+10),"Plantilla real: plantilla_tiles_zona1.png (160×128, rejilla de 16×16). Esta imagen es solo la leyenda.",fill=(170,170,180),font=f)
big.save(sys.argv[1]+"/plantilla_tiles_zona1_leyenda.png")
