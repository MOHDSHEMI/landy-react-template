import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  FormLabel,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { withTranslation } from "react-i18next";
import { ContactProps } from "./types";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IValues {
  name: string;
  telephone: string;
  email: string;
  address: string;
  council: string;
  bins: string[];
  collectionDay: string;
  service: string;
  extraInfo: string;
}

function useForm() {
  const [values, setValues] = useState<IValues>({
    name: "",
    telephone: "",
    email: "",
    address: "",
    council: "",
    bins: [],
    collectionDay: "",
    service: "",
    extraInfo: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof IValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleCheckboxChange = (bin: string) => {
    const newBins = values.bins.includes(bin)
      ? values.bins.filter((b) => b !== bin)
      : [...values.bins, bin];
    setValues({ ...values, bins: newBins });
    setErrors({ ...errors, bins: undefined });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validation: Partial<Record<keyof IValues, string>> = {};
    if (!values.name.trim()) validation.name = "Required";
    if (!values.telephone.trim()) validation.telephone = "Required";
    if (!values.email.trim()) validation.email = "Required";
    if (!values.address.trim()) validation.address = "Required";
    if (!values.council.trim()) validation.council = "Required";
    if (!values.bins.length) validation.bins = "Select at least one bin";
    if (!values.collectionDay.trim()) validation.collectionDay = "Required";
    if (!values.service.trim()) validation.service = "Required";

    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      toast.error("Please fill Required Fields before submitting!");
      return;
    }

    setStatus("submitting");
    try {
      await addDoc(collection(db, "bookings"), {
        ...values,
        createdAt: Timestamp.now(),
      });
      toast.success("Booking submitted successfully!");
      setValues({
        name: "",
        telephone: "",
        email: "",
        address: "",
        council: "",
        bins: [],
        collectionDay: "",
        service: "",
        extraInfo: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return { values, errors, handleChange, handleCheckboxChange, handleSubmit, status };
}

const Contact = ({ id, t }: ContactProps) => {
  const { values, errors, handleChange, handleCheckboxChange, handleSubmit, status } = useForm();
  const isMobile = useMediaQuery("(max-width:600px)");

  const primaryColor = "rgb(22, 88, 59)";

  const binLabels: Record<string, string> = {
    green: "Green Bin",
    black: "Black Bin",
    blue: "Blue Bin",
    caddy: "Brown Food Caddy",
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
  const services = [
    { val: "oneOff", label: "One-off Clean" },
    { val: "6Clean", label: "6 Clean Package" },
    { val: "MonthlyClean", label: "Monthly Clean Package" },
    // { val: "caddyClean", label: "Caddy Subscription" },
  ];

  return (
    <Box id={id} sx={{ bgcolor: "#f5f7fa", py: 3, px: 2 }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Stack direction="row" justifyContent="center">
        <Box sx={{ width: { xs: "100%", sm: "90%", md: "70%", lg: "55%" } }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography
                variant="h5"
                align="center"
                fontWeight={700}
                color={primaryColor}
                mb={1}
              >
                Book Your Bin Cleaning
              </Typography>
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                mb={3}
              >
                Fill in the details and we’ll handle your bins professionally.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Stack spacing={1.5}>
                  {/* Name & Phone */}
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      size="small"
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="telephone"
                      value={values.telephone}
                      onChange={handleChange}
                      error={!!errors.telephone}
                      helperText={errors.telephone}
                      size="small"
                    />
                  </Stack>

                  {/* Email */}
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    size="small"
                  />

                  {/* Council & Address */}
                  <TextField
                    fullWidth
                    label="Local Council"
                    name="council"
                    value={values.council}
                    onChange={handleChange}
                    error={!!errors.council}
                    helperText={errors.council}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    minRows={2}
                    value={values.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    size="small"
                  />

                  {/* Bins */}
 <Box>
  <FormLabel component="legend" sx={{ fontWeight: 600 }}>
    Bins to Clean *
  </FormLabel>
  <FormGroup row>
    {Object.keys(binLabels).map((bin) => {
      // Assign color per bin type
      let binColor = "";
      switch (bin) {
        case "green":
          binColor = "#28a745";
          break;
        case "black":
          binColor = "#343a40";
          break;
        case "blue":
          binColor = "#007bff";
          break;
        case "caddy":
          binColor = "#8b4513";
          break;
        default:
          binColor = "#ccc";
      }

      return (
        <FormControlLabel
          key={bin}
          control={
            <Checkbox
              checked={values.bins.includes(bin)}
              onChange={() => handleCheckboxChange(bin)}
              icon={<DeleteOutlineIcon sx={{ color: binColor }} />}
              checkedIcon={<DeleteOutlineIcon sx={{ color: "rgb(22,88,59)" }} />}
              size="small"
            />
          }
          label={binLabels[bin]}
        />
      );
    })}
  </FormGroup>
  {errors.bins && (
    <Typography color="error" variant="caption">
      {errors.bins}
    </Typography>
  )}
</Box>



                  {/* Collection Day & Service */}
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Box>
                      <FormLabel sx={{ fontWeight: 600 }}>Collection Day *</FormLabel>
                      <RadioGroup
                        row
                        name="collectionDay"
                        value={values.collectionDay}
                        onChange={handleChange}
                      >
                        {days.map((d) => (
                          <FormControlLabel
                            key={d}
                            value={d}
                            control={<Radio sx={{ color: primaryColor, "&.Mui-checked": { color: primaryColor } }} />}
                            label={d}
                          />
                        ))}
                      </RadioGroup>
                      {errors.collectionDay && (
                        <Typography color="error" variant="caption">
                          {errors.collectionDay}
                        </Typography>
                      )}
                    </Box>

                    <Box>
                      <FormLabel sx={{ fontWeight: 600 }}>Service *</FormLabel>
                      <RadioGroup name="service" value={values.service} onChange={handleChange}>
                        {services.map((svc) => (
                          <FormControlLabel
                            key={svc.val}
                            value={svc.val}
                            control={<Radio sx={{ color: primaryColor, "&.Mui-checked": { color: primaryColor } }} />}
                            label={svc.label}
                          />
                        ))}
                      </RadioGroup>
                      {errors.service && (
                        <Typography color="error" variant="caption">
                          {errors.service}
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  {/* Additional Notes */}
                  <TextField
                    fullWidth
                    label="Additional Notes"
                    name="extraInfo"
                    multiline
                    minRows={2}
                    value={values.extraInfo}
                    onChange={handleChange}
                    size="small"
                  />

                  {/* Submit */}
                  <Stack direction="row" justifyContent="center" mt={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        px: 4,
                        py: 1.2,
                        borderRadius: 2,
                        fontWeight: 600,
                        bgcolor: primaryColor,
                        "&:hover": { bgcolor: primaryColor },
                      }}
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <CircularProgress size={22} color="inherit" />
                      ) : (
                        t("Submit Booking")
                      )}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
};

export default withTranslation()(Contact);
