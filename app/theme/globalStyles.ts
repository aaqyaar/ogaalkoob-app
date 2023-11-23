import { ViewStyle } from "react-native"

// a few common styles like flex, center, etc

export const flex: ViewStyle = { flex: 1 }

export const centerHorizontal: ViewStyle = {
  alignItems: "center",
}

export const centerVertical: ViewStyle = {
  justifyContent: "center",
}

export const center: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

export const row: ViewStyle = {
  flexDirection: "row",
}

export const rowCenter: ViewStyle = {
  ...row,
  ...center,
}

export const rowCenterSpaceBetween: ViewStyle = {
  ...rowCenter,
  justifyContent: "space-between",
}

export const rowCenterSpaceAround: ViewStyle = {
  ...rowCenter,
  justifyContent: "space-around",
}

export const rowCenterSpaceEvenly: ViewStyle = {
  ...rowCenter,
  justifyContent: "space-evenly",
}

export const rowCenterTop: ViewStyle = {
  ...rowCenter,
  justifyContent: "flex-start",
}

export const rowCenterBottom: ViewStyle = {
  ...rowCenter,
  justifyContent: "flex-end",
}

export const rowLeft: ViewStyle = {
  ...row,
  justifyContent: "flex-start",
}

export const rowRight: ViewStyle = {
  ...row,
  justifyContent: "flex-end",
}

export const column: ViewStyle = {
  flexDirection: "column",
}

export const columnCenter: ViewStyle = {
  ...column,
  ...center,
}

export const columnCenterLeft: ViewStyle = {
  ...columnCenter,
  alignItems: "flex-start",
}

export const columnCenterRight: ViewStyle = {
  ...columnCenter,
  alignItems: "flex-end",
}

export const columnCenterTop: ViewStyle = {
  ...columnCenter,
  justifyContent: "flex-start",
}

export const columnCenterBottom: ViewStyle = {
  ...columnCenter,
  justifyContent: "flex-end",
}

export const columnCenterSpaceBetween: ViewStyle = {
  ...columnCenter,
  justifyContent: "space-between",
}

export const columnCenterSpaceAround: ViewStyle = {
  ...columnCenter,
  justifyContent: "space-around",
}

export const columnCenterSpaceEvenly: ViewStyle = {
  ...columnCenter,
  justifyContent: "space-evenly",
}

export const columnLeft: ViewStyle = {
  ...column,
  justifyContent: "flex-start",
}

export const columnRight: ViewStyle = {
  ...column,
  justifyContent: "flex-end",
}

export const absoluteFill: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export const absoluteTopLeft: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
}

export const absoluteTopRight: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
}

export const absoluteTopCenter: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
}

export const absoluteBottomLeft: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
}

export const absoluteBottomRight: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
}

export const absoluteBottomCenter: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  left: 0,
}

export const absoluteCenter: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  ...center,
}
