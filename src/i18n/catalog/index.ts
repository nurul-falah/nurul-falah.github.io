import { mergeCatalogs } from "../translate";
import { adart } from "./adart";
import { adartRest } from "./adart-rest";
import { content } from "./content";
import { history } from "./history";
import { program } from "./program";
import { ui } from "./ui";

export const catalog = mergeCatalogs(ui, content, history, program, adart, adartRest);
