import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Veyla - Bouppteckning digitalt för 1999kr";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #12d39d 0%, #2bedb7 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "48px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            V
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            Veyla
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#1f2937",
            textAlign: "center",
            marginBottom: "20px",
            maxWidth: "1000px",
            lineHeight: "1.1",
          }}
        >
          Bouppteckning digitalt för 1999kr
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            color: "#6b7280",
            textAlign: "center",
            marginBottom: "40px",
            maxWidth: "800px",
          }}
        >
          Trygg, transparent och kostnadseffektiv med AI-guidning
        </div>

        {/* Price badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0ea47a",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            padding: "16px 32px",
            borderRadius: "50px",
          }}
        >
          10% av traditionell kostnad
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
