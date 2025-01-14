from fasthtml.common import *
from monsterui.all import *
from team import team_members

app, rt = fast_app(hdrs=Theme.blue.headers(), live=True)

def NavBar():
    return NavBarContainer(
        NavBarLSide(H3("Parlance Labs")),
        NavBarRSide(NavBarNav(
                Li(A("Services", href="/services")),
                Li(A("Blog", href="/education")),
                Li(A("Team", href=team)),
                Li(A("Education", href="/education")),
                Li(A("Theme", href=theme)))))

def TOC():
    mbrs1 = map(lambda x: Li(A(x, href='#'+x.lower(), cls='text-sm capitalize')), team_members.keys())
    return NavContainer(*mbrs1, cls=(NavT.primary,'w-48 p-2 rounded float-right sticky top-4 hidden md:block'))

def TeamCard(name, description, img):
    return Card(
        DivLAligned(
            Img(src=img, cls='rounded-full w-24 h-24 object-cover'),
            Div(H3(name, cls='capitalize')),
            cls='space-x-10'),
        render_md(description),
        footer=DivRAligned(*(UkIconLink(icon, height=16) for icon in ("linkedin", "globe"))),
        id=name.lower())

@rt
def team():
    return NavBar(), Titled("Team", 
        P("The Parlance Team"),
        TOC(),
        Grid(*[TeamCard(name, desc, f'../images/{img}') for name, (img, desc) in team_members.items()],
            cols_sm=1,cols_md=1,cols_lg=2,cols_xl=2,))

@rt
def theme():
    from fasthtml.components import Uk_theme_switcher
    return NavBar(), Uk_theme_switcher()

serve()