import { AcriTraitDimensionMatrixVisual } from "./methodology/AcriTraitDimensionMatrixVisual";

/**
 * Authoritative TraitDimensionMap component.
 * Renders the interactive dot-density and percentage weight matrix
 * connecting the 13 evaluated traits to the 5 core occupational dimensions.
 */
export function TraitDimensionMap() {
  return <AcriTraitDimensionMatrixVisual />;
}
