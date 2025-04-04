import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import OverviewChart from "@/components/OverviewChart";
import Header from "@/components/Header";
import FlexBetween from "@/components/FlexBetween";
import StatBox from "@/components/StatBox";

function Dashboard() {
  const theme = useTheme();

  // Dummy data for StatBoxes (replace with your actual data)
  const statBoxData = {
    sentSMS: { value: 0, increase: "+14%", description: "Sent SMS" },
    deliveredSMS: { value: 0, increase: "+21%", description: "Delivered SMS" },
    failedSMS: { value: 0, increase: "+5%", description: "Failed SMS" },
    queuedSMS: { value: 0, increase: "+43%", description: "Queued SMS" },
  };

  // Dummy data for Report section (replace with your actual data)
  const reportData = {
    publishedCampaign: { value: 100, progress: 100 },
    completedCampaign: { value: 0, progress: 0 },
    successfulSent: { value: 0, progress: 0 },
    failedSMS: { value: 0, progress: 0 },
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Grid container spacing={2} mt="20px">
        {/* Top 4 Stat Boxes */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <StatBox
                title="Sent SMS"
                value={statBoxData.sentSMS.value}
                increase={statBoxData.sentSMS.increase}
                description={statBoxData.sentSMS.description}
                icon={
                  <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatBox
                title="Delivered SMS"
                value={statBoxData.deliveredSMS.value}
                increase={statBoxData.deliveredSMS.increase}
                description={statBoxData.deliveredSMS.description}
                icon={
                  <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatBox
                title="Failed SMS"
                value={statBoxData.failedSMS.value}
                increase={statBoxData.failedSMS.increase}
                description={statBoxData.failedSMS.description}
                icon={
                  <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatBox
                title="Queued SMS"
                value={statBoxData.queuedSMS.value}
                increase={statBoxData.queuedSMS.increase}
                description={statBoxData.queuedSMS.description}
                icon={
                  <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                }
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Report Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: "1rem", mt: "20px", backgroundColor: theme.palette.background.default }}> {/* Set body background color */}
            <FlexBetween>
              <Typography variant="h6">Report</Typography>
              <Typography>&lt;</Typography>
            </FlexBetween>
            <Grid container spacing={2} mt="10px">
              <Grid item xs={12} md={3}>
                <Typography>Published Campaign</Typography>
                <Typography variant="h4">{reportData.publishedCampaign.value}%</Typography>
                <LinearProgress variant="determinate" value={reportData.publishedCampaign.progress} sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography>Completed Campaign</Typography>
                <Typography variant="h4">{reportData.completedCampaign.value} {reportData.completedCampaign.progress.toFixed(2)}%</Typography>
                <LinearProgress variant="determinate" value={reportData.completedCampaign.progress} sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography>Successful Sent</Typography>
                <Typography variant="h4">{reportData.successfulSent.value}</Typography>
                <LinearProgress variant="determinate" value={reportData.successfulSent.progress} sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography>Failed SMS</Typography>
                <Typography variant="h4">{reportData.failedSMS.value} %</Typography>
                <LinearProgress variant="determinate" value={reportData.failedSMS.progress} sx={{ mt: 1 }} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Overview Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: "1rem", height: "500px", width: "100%", mt: "20px" }}>
            <OverviewChart view="sales" isDashboard={true} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;