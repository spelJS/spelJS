Vi märkte att det var tungt för datorn att flytta på monstrerna och
spacedust-molnen med hjälp av keyframe-animationer så vi bytte ut dem
mot js-animationer istället.

I början hade vi animerat även storleken på text-sahdown men det skapade
så pass liten effekt att vi bestämde oss för att ta bort animationen helt
för att göra sidan ännu snabbare.

Vi optimerade både bakgrundsbilderna och bakgrundsvideon. Videon lyckades
vi komprimera till bara 605 K, vilket visade sig vara snabbare än en GIF-fil
eller den ursprungliga JavaScript-animationen som fick bakgrunden att skifta
i olika färger. Dessutom är spelaren en SVG-bild och för att skapa monstrerna
använder vi oss av ett spritesheet.
