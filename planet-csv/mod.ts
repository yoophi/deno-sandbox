import { join } from "https://deno.land/std/path/mod.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { pick } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Planet {
  [key: string]: string;
}

async function loadPlanetData() {
  const path = join(".", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);

  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: "#",
  });
  Deno.close(file.rid);

  const planets = (result as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellaRadius = Number(planet["koi_srad"]);
    const stellaMass = Number(planet["koi_smass"]);

    return (
      planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 &&
      planetaryRadius < 1.5 &&
      stellaRadius > 0.99 &&
      stellaRadius < 1.01 &&
      stellaMass > 0.78 &&
      stellaMass < 1.04
    );
  });

  return planets.map((planet) => {
    return pick(planet, [
      "kepler_name",
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "koi_count",
      "koi_steff",
    ]);
  });
}

const newEarths = await loadPlanetData();
for (const planet of newEarths) {
  console.log(planet);
}
console.log(`${newEarths.length} habitable planets found!`);
