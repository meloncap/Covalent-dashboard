import React, { useState } from "react";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import {
  Treemap,
  hierarchy,
  stratify,
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
} from "@visx/hierarchy";
import {
  useTooltip,
  useTooltipInPortal,
  TooltipWithBounds,
} from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { TileMethod } from "@visx/hierarchy/lib/types";

import { scaleLinear } from "@visx/scale";
import { formatNumber } from "../../utils";

export const color1 = "#585eff";
const color2 = "#9c9efd";
export const background = "#a9acff";

//@ts-ignore
const tileMethods: { [tile: string]: TileMethod<typeof data> } = {
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
};

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

export type TreemapProps = {
  width: number;
  height: number;
  items: { parent: string; id: string; size: number; img: string }[];
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function PackToken({
  width,
  height,
  items,
  margin = defaultMargin,
}: TreemapProps) {
  const colorScale = scaleLinear<string>({
    domain: [0, Math.max(...items.map(d => d.size || 0))],
    range: [color2, color1],
  });

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);

    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum,
    });
  };

  const data = stratify<{ parent: string; id: string; size: number }>()
    .id(d => d.id)
    .parentId(d => d.parent)(items)
    .sum(d => d.size || 0);

  const [tileMethod, setTileMethod] = useState<string>("treemapSquarify");
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const root = hierarchy(data).sort((a, b) => (b.value || 0) - (a.value || 0));

  return width < 10 ? null : (
    <div>
      <div>
        <svg width={width} height={height} ref={containerRef}>
          <rect width={width} height={height} rx={14} fill={background}></rect>
          {items.length === 1 && (
            <text
              x={width / 2}
              y={height / 2}
              transform={`translate(-${width / 15},-${height / 40})`}
              style={{ stroke: "white", fill: "white" }}
              fontSize="35"
              color="white"
            >
              No data
            </text>
          )}
          <Treemap<typeof data>
            top={margin.top}
            root={root}
            size={[xMax, yMax]}
            tile={tileMethods[tileMethod]}
            round
          >
            {treemap => (
              <Group>
                {treemap
                  .descendants()
                  .reverse()
                  .map((node, i) => {
                    const nodeWidth = node.x1 - node.x0;
                    const nodeHeight = node.y1 - node.y0;
                    return (
                      <Group
                        key={`node-${i}`}
                        top={node.y0 + margin.top}
                        left={node.x0 + margin.left}
                        onMouseMove={e => handleMouseOver(e, node.data.id)}
                        onMouseOut={hideTooltip}
                      >
                        {node.depth === 1 && (
                          <svg xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <rect
                                width={nodeWidth}
                                height={nodeHeight}
                                stroke={background}
                                strokeWidth={4}
                                rx={10}
                                fill={colorScale(node.value || 0)}
                              />
                              <Text
                                x={nodeWidth / 1.9}
                                y={nodeHeight / 2.5}
                                transform="translate(-50%,-50%)"
                                fill="white"
                                fontSize={nodeHeight / 5}
                                verticalAnchor="start"
                                textAnchor="middle"
                                onMouseMove={e =>
                                  handleMouseOver(e, node.data.id)
                                }
                                onMouseOut={hideTooltip}
                              >
                                {node.data.id?.substring(0, 5)}
                              </Text>
                            </g>
                          </svg>
                        )}
                        {node.depth > 2 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            fill={colorScale(node.value || 0)}
                          />
                        )}
                      </Group>
                    );
                  })}
                {tooltipOpen && (
                  <TooltipInPortal
                    // set this to random so it correctly updates with parent bounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <strong>
                        {formatNumber(
                          items.find(it => it.id === tooltipData).size
                        )}
                        $
                      </strong>
                    </div>
                  </TooltipInPortal>
                )}
              </Group>
            )}
          </Treemap>
        </svg>
      </div>
    </div>
  );
}
