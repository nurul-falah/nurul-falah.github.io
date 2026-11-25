import { mergeCatalogs } from "../translate";
import { adart } from "./adart";
import { adartRest } from "./adart-rest";
import { content } from "./content";
import { donate } from "./donate";
import { history } from "./history";
import { ui } from "./ui";

export const catalog = mergeCatalogs(ui, content, history, adart, adartRest, donate);
