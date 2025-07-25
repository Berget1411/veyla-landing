import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon512() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 320,
          background: "linear-gradient(135deg, #12d39d 0%, #2bedb7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "50px",
          fontWeight: "bold",
        }}
      >
        V
      </div>
    ),
    {
      ...size,
    }
  );
}
