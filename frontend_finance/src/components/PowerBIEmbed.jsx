import React, { useEffect, useRef } from "react";
import * as powerbi from "powerbi-client";
import { models, service, factories } from "powerbi-client";

const PowerBIEmbed = () => {
  const embedContainer = useRef(null);
  const powerbiService = new service.Service(
    factories.hpmFactory,
    factories.wpmpFactory,
    factories.routerFactory
  );

  const fetchEmbedDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/powerbi-token");
      const { embedToken, embedUrl, reportId } = await response.json();

      const embedConfig = {
        type: "report",
        id: reportId,
        embedUrl,
        accessToken: embedToken.token,
        tokenType: models.TokenType.Embed,
        settings: {
          panes: {
            filters: { visible: false },
            pageNavigation: { visible: true },
          },
        },
      };

      // Reset container if already embedded
      powerbiService.reset(embedContainer.current);

      const report = powerbiService.embed(embedContainer.current, embedConfig);

      // Dynamic subheading based on tab
      report.on("loaded", async () => {
        const pages = await report.getPages();
        if (pages.length) {
          document.getElementById("reportTabName").textContent = pages[0].displayName;
        }
      });

      report.on("pageChanged", (event) => {
        const newTab = event.detail?.newPage?.displayName;
        if (newTab) {
          document.getElementById("reportTabName").textContent = newTab;
        }
      });

    } catch (error) {
      console.error("Error embedding Power BI:", error);
    }
  };

  useEffect(() => {
    fetchEmbedDetails();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={embedContainer}
        style={{
          height: "85vh",
          width: "90vw",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          backgroundColor: "#fff"
        }}
      />
    </div>
  );
};

export default PowerBIEmbed;
