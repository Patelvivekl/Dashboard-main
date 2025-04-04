import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  LinearProgress,
  alpha,
} from "@mui/material";
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import FlexBetween from "@/components/FlexBetween";
import StatBox from "@/components/StatBox";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function Dashboard() {
  const theme = useTheme();
  const chartRef = useRef(null);
  const [animate, setAnimate] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);

  const colors = {
    sent: theme.palette.mode === "dark" ? "#FF7043" : "#FF5722",
    delivered: theme.palette.mode === "dark" ? "#66BB6A" : "#4CAF50",
    failed: theme.palette.mode === "dark" ? "#E57373" : "#F44336",
    queued: theme.palette.mode === "dark" ? "#64B5F6" : "#2196F3",
    purple: theme.palette.mode === "dark" ? "#BA68C8" : "#9C27B0",
    card: theme.palette.mode === "light" ? theme.palette.background.paper : "#02081d",
  };

  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!animate) {
        setCount(end);
        return;
      }

      let startTime;
      const startCount = 0;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - startCount) + startCount));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }, [end, animate]);

    return count;
  };

  const statBoxData = {
    sentSMS: { value: useCounter(12500), increase: "+14%", description: "Sent SMS" },
    deliveredSMS: { value: useCounter(10800), increase: "+21%", description: "Delivered SMS" },
    failedSMS: { value: useCounter(1200), increase: "+5%", description: "Failed SMS" },
    queuedSMS: { value: useCounter(500), increase: "+43%", description: "Queued SMS" },
  };

  const reportData = {
    publishedCampaign: { value: useCounter(100), progress: 100 },
    completedCampaign: { value: useCounter(85), progress: 85 },
    successfulSent: { value: useCounter(10800), progress: 86 },
    failedSMS: { value: useCounter(12), progress: 12 },
  };

  const getCardBgColor = (color) => alpha(color, 0.1);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const sentGradient = ctx.createLinearGradient(0, 0, 0, 400);
    sentGradient.addColorStop(0, alpha(colors.sent, 0.6));
    sentGradient.addColorStop(1, alpha(colors.sent, 0.1));

    const deliveredGradient = ctx.createLinearGradient(0, 0, 0, 400);
    deliveredGradient.addColorStop(0, alpha(colors.delivered, 0.6));
    deliveredGradient.addColorStop(1, alpha(colors.delivered, 0.1));

    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Sent SMS",
          data: [3800, 4200, 3500, 3000, 2800, 1800, 3000, 4800, 5200, 5500, 6800, 8200],
          borderColor: colors.sent,
          backgroundColor: sentGradient,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: "Delivered SMS",
          data: [1000, 3000, 4000, 5500, 6500, 8000, 5500, 3000, 2800, 4000, 6000, 8000],
          borderColor: colors.delivered,
          backgroundColor: deliveredGradient,
          fill: true,
          tension: 0.4,
          borderWidth: 2,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: alpha(theme.palette.text.primary, 0.1),
            },
          },
          x: {
            grid: {
              color: alpha(theme.palette.text.primary, 0.1),
            },
          },
        },
        animation: {
          duration: animate ? 2000 : 0,
          easing: "easeInOutQuart",
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            titleColor: theme.palette.text.primary,
            bodyColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            usePointStyle: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    };

    const myChart = new Chart(ctx, config);
    setChartInstance(myChart);

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [animate, theme, colors]);

  const toggleAnimation = () => {
    setAnimate(!animate);
  };

  const CardWithBalloons = ({ color, children }) => (
    <Card
      elevation={3}
      sx={{
        backgroundColor: colors.card,
        borderTop: `1px solid ${color}`,
        borderRadius: "10px",
        transition: "transform 0.3s, box-shadow 0.3s",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            50% { transform: translateY(-60px) rotate(8deg); opacity: 0.8; }
            100% { transform: translateY(-120px) rotate(0deg); opacity: 0; }
          }

          .balloon-container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
          }

          .balloon {
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            bottom: -30px;
            opacity: 0.7;
            animation: float 15s infinite ease-in;
          }

          .balloon-1 {
            left: 10%;
            animation-duration: 8s;
            animation-delay: 0s;
          }

          .balloon-2 {
            left: 30%;
            animation-duration: 12s;
            animation-delay: 1s;
          }

          .balloon-3 {
            left: 50%;
            animation-duration: 15s;
            animation-delay: 2s;
          }

          .balloon-4 {
            left: 70%;
            animation-duration: 14s;
            animation-delay: 0.5s;
          }

          .balloon-5 {
            left: 90%;
            animation-duration: 11s;
            animation-delay: 1.5s;
          }
        `}
      </style>
      <div className="balloon-container">
        <div className="balloon balloon-1" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(color, 0.4)})` }}></div>
        <div className="balloon balloon-2" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(color, 0.4)})` }}></div>
        <div className="balloon balloon-3" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(color, 0.4)})` }}></div>
        <div className="balloon balloon-4" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(color, 0.4)})` }}></div>
        <div className="balloon balloon-5" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(color, 0.4)})` }}></div>
      </div>
      <CardContent sx={{ position: "relative", zIndex: 1 }}>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Grid container spacing={3}>
        {Object.entries(statBoxData).map(([key, data]) => (
          <Grid item xs={12} sm={6} lg={3} key={key}>
            <CardWithBalloons color={colors[key.replace("SMS", "").toLowerCase()]}>
              <StatBox
                title={data.description}
                value={data.value.toLocaleString()}
                increase={data.increase}
                description={data.description}
                icon={
                  <Box
                    sx={{
                      backgroundColor: getCardBgColor(colors[key.replace("SMS", "").toLowerCase()]),
                      borderRadius: "50%",
                      p: 1.5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {key === "sentSMS" && <Email sx={{ color: colors.sent, fontSize: "26px" }} />}
                    {key === "deliveredSMS" && <PointOfSale sx={{ color: colors.delivered, fontSize: "26px" }} />}
                    {key === "failedSMS" && <PersonAdd sx={{ color: colors.failed, fontSize: "26px" }} />}
                    {key === "queuedSMS" && <Traffic sx={{ color: colors.queued, fontSize: "26px" }} />}
                  </Box>
                }
              />
            </CardWithBalloons>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Card
            elevation={3}
            sx={{
              backgroundColor: colors.card,
              borderRadius: "10px",
              p: 2,
              transition: "box-shadow 0.3s",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            <style>
              {`
                @keyframes float {
                  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                  50% { transform: translateY(-60px) rotate(8deg); opacity: 0.8; }
                  100% { transform: translateY(-120px) rotate(0deg); opacity: 0; }
                }

                .balloon-container {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 100%;
                  overflow: hidden;
                  pointer-events: none;
                  z-index: 0;
                }

                .balloon {
                  position: absolute;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  bottom: -30px;
                  opacity: 0.7;
                  animation: float 15s infinite ease-in;
                }

                .balloon-1 {
                  left: 10%;
                  animation-duration: 8s;
                  animation-delay: 0s;
                }

                .balloon-2 {
                  left: 30%;
                  animation-duration: 12s;
                  animation-delay: 1s;
                }

                .balloon-3 {
                  left: 50%;
                  animation-duration: 15s;
                  animation-delay: 2s;
                }

                .balloon-4 {
                  left: 70%;
                  animation-duration: 14s;
                  animation-delay: 0.5s;
                }

                .balloon-5 {
                  left: 90%;
                  animation-duration: 11s;
                  animation-delay: 1.5s;
                }
              `}
            </style>
            <div className="balloon-container">
              <div className="balloon balloon-1" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(colors.purple, 0.4)})` }}></div>
              <div className="balloon balloon-2" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(colors.sent, 0.4)})` }}></div>
              <div className="balloon balloon-3" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(colors.delivered, 0.4)})` }}></div>
              <div className="balloon balloon-4" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(colors.failed, 0.4)})` }}></div>
              <div className="balloon balloon-5" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${alpha(colors.queued, 0.4)})` }}></div>
            </div>

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <FlexBetween>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Report
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  &lt;
                </Typography>
              </FlexBetween>

              <Grid container spacing={3}>
                {Object.entries(reportData).map(([key, data]) => (
                  <Grid item xs={12} md={3} key={key}>
                    <Box mb={2}>
                      <Typography color="textSecondary" mb={1}>
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {data.value.toLocaleString()}{key.includes("Campaign") ? "%" : ""}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.progress}
                        sx={{
                          mt: 1,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: alpha(colors[key.includes("failed") ? "failed" : key.includes("successful") ? "queued" : key.includes("completed") ? "delivered" : "sent"], 0.2),
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: colors[key.includes("failed") ? "failed" : key.includes("successful") ? "queued" : key.includes("completed") ? "delivered" : "sent"],
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <FlexBetween mb={2}>
            <Button
              variant="contained"
              color={animate ? "primary" : "secondary"}
              startIcon={<DownloadOutlined />}
              onClick={toggleAnimation}
              sx={{
                backgroundColor: animate ? theme.palette.primary.main : theme.palette.secondary.main,
                boxShadow: 3,
                "&:hover": {
                  backgroundColor: animate ? theme.palette.primary.dark : theme.palette.secondary.dark,
                },
              }}
            >
              {animate ? "Disable" : "Enable"} Chart
            </Button>
          </FlexBetween>
          <Card
            elevation={3}
            sx={{
              backgroundColor: colors.card,
              borderRadius: "10px",
              p: 2,
              height: "400px",
              transition: "box-shadow 0.3s",
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              SMS Overview
            </Typography>
            <Box sx={{ height: "calc(100% - 40px)", position: "relative" }}>
              <canvas ref={chartRef} id="myChart" />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;