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
  Radio,
  RadioGroup,
  Stack,
  Divider,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { withTranslation } from "react-i18next";
import { ContactProps } from "./types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface IValues {
  name: string;
  telephone: string;
  email: string;
  address: string;
  council: string;
  bins: string[];
  collectionDay: string;
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

    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      toast.error("Please fill all required fields before submitting!");
      return;
    }

    setStatus("submitting");
    try {
      // Format bins for display
      const binLabels: Record<string, string> = {
        green: "Green Bin",
        black: "Black Bin",
        blue: "Blue Bin",
        caddy: "Brown Food Caddy",
      };
      const binsFormatted = values.bins.map(b => binLabels[b]).join(", ");

      // Create WhatsApp message
      const message = `*New Monthly Bin Cleaning Booking*

*Name:* ${values.name}
*Phone:* ${values.telephone}
*Email:* ${values.email}
*Address:* ${values.address}
*Council:* ${values.council}
*Bins:* ${binsFormatted}
*Collection Day:* ${values.collectionDay}
*Service:* Monthly Clean Package
${values.extraInfo ? `*Additional Notes:* ${values.extraInfo}` : ''}`;

      // Replace with your WhatsApp number (include country code without + sign)
      const whatsappNumber = "447722045308";
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");

      toast.success("Redirecting to WhatsApp...");

      // Reset form
      setValues({
        name: "",
        telephone: "",
        email: "",
        address: "",
        council: "",
        bins: [],
        collectionDay: "",
        extraInfo: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to open WhatsApp. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return { values, errors, handleChange, handleCheckboxChange, handleSubmit, status };
}

const Contact = ({ id, t }: ContactProps) => {
  const { values, errors, handleChange, handleCheckboxChange, handleSubmit, status } = useForm();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  const primaryColor = "#16583b";
  const primaryLight = "#1a6b47";
  const primaryDark = "#0f3d29";

  const binOptions = [
    { key: "green", label: "Green Bin", color: "#28a745", icon: "🗑️" },
    { key: "black", label: "Black Bin", color: "#343a40", icon: "🗑️" },
    { key: "blue", label: "Blue Bin", color: "#007bff", icon: "♻️" },
    { key: "caddy", label: "Brown Food Caddy", color: "#8b4513", icon: "🥫" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <Box id={id} sx={{ bgcolor: "#f5f7fa", py: { xs: 3, sm: 5, md: 6 }, px: { xs: 2, sm: 3 } }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Stack direction="row" justifyContent="center">
        <Box sx={{ width: { xs: "100%", sm: "95%", md: "85%", lg: "70%", xl: "60%" }, maxWidth: 900 }}>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: primaryColor,
              borderRadius: { xs: 2, sm: 3 },
              p: { xs: 3, sm: 4 },
              mb: 2,
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryDark} 100%)`,
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              align="center"
              fontWeight={700}
              color="white"
              gutterBottom
            >
              Monthly Bin Cleaning Service
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="rgba(255,255,255,0.95)"
              sx={{ maxWidth: 600, mx: "auto", fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              Professional bin cleaning delivered monthly. Keep your bins fresh and hygienic all year round.
            </Typography>
          </Paper>

          <Card
            sx={{
              borderRadius: { xs: 2, sm: 3 },
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 4, md: 5 } }}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {/* Contact Information Section */}
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={primaryColor}
                      mb={2.5}
                      sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                    >
                      Contact Information
                    </Typography>

                    <Stack spacing={2.5}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": { borderColor: primaryLight },
                            "&.Mui-focused fieldset": { borderColor: primaryColor },
                          },
                        }}
                      />

                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="telephone"
                          value={values.telephone}
                          onChange={handleChange}
                          error={!!errors.telephone}
                          helperText={errors.telephone}
                          required
                          InputProps={{
                            startAdornment: <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": { borderColor: primaryLight },
                              "&.Mui-focused fieldset": { borderColor: primaryColor },
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          required
                          InputProps={{
                            startAdornment: <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": { borderColor: primaryLight },
                              "&.Mui-focused fieldset": { borderColor: primaryColor },
                            },
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  {/* Location Section */}
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={primaryColor}
                      mb={2.5}
                      sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                    >
                      Service Location
                    </Typography>

                    <Stack spacing={2.5}>
                      <TextField
                        fullWidth
                        label="Local Council"
                        name="council"
                        value={values.council}
                        onChange={handleChange}
                        error={!!errors.council}
                        helperText={errors.council || "e.g., Westminster, Camden, etc."}
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": { borderColor: primaryLight },
                            "&.Mui-focused fieldset": { borderColor: primaryColor },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Full Address"
                        name="address"
                        multiline
                        rows={3}
                        value={values.address}
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address || "Include street, city, and postcode"}
                        required
                        InputProps={{
                          startAdornment: (
                            <HomeIcon
                              sx={{
                                mr: 1,
                                color: "text.secondary",
                                alignSelf: "flex-start",
                                mt: 1.5,
                              }}
                            />
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": { borderColor: primaryLight },
                            "&.Mui-focused fieldset": { borderColor: primaryColor },
                          },
                        }}
                      />
                    </Stack>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  {/* Bins Selection Section */}
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                      <DeleteIcon sx={{ color: primaryColor }} />
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color={primaryColor}
                        sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                      >
                        Select Bins to Clean
                      </Typography>
                    </Stack>

                    <Stack spacing={1.5}>
                      {binOptions.map((bin) => (
                        <Paper
                          key={bin.key}
                          elevation={values.bins.includes(bin.key) ? 3 : 0}
                          sx={{
                            p: 1.5,
                            border: values.bins.includes(bin.key)
                              ? `2px solid ${primaryColor}`
                              : "2px solid #e0e0e0",
                            borderRadius: 2,
                            transition: "all 0.2s",
                            cursor: "pointer",
                            bgcolor: values.bins.includes(bin.key) ? "#f0f7f4" : "white",
                            "&:hover": {
                              borderColor: primaryLight,
                              boxShadow: 2,
                            },
                          }}
                          onClick={() => handleCheckboxChange(bin.key)}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.bins.includes(bin.key)}
                                onChange={() => handleCheckboxChange(bin.key)}
                                sx={{
                                  color: bin.color,
                                  "&.Mui-checked": { color: primaryColor },
                                }}
                              />
                            }
                            label={
                              <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Typography fontSize="1.5rem">{bin.icon}</Typography>
                                <Typography fontWeight={500}>{bin.label}</Typography>
                              </Stack>
                            }
                            sx={{ m: 0, width: "100%" }}
                          />
                        </Paper>
                      ))}
                    </Stack>

                    {errors.bins && (
                      <Typography color="error" variant="caption" sx={{ mt: 1, display: "block" }}>
                        {errors.bins}
                      </Typography>
                    )}
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  {/* Collection Day Section */}
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                      <CalendarTodayIcon sx={{ color: primaryColor }} />
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color={primaryColor}
                        sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                      >
                        Bin Collection Day
                      </Typography>
                    </Stack>

                    <RadioGroup
                      name="collectionDay"
                      value={values.collectionDay}
                      onChange={handleChange}
                    >
                      <Stack spacing={1}>
                        {days.map((day) => (
                          <Paper
                            key={day}
                            elevation={values.collectionDay === day ? 3 : 0}
                            sx={{
                              p: 1.5,
                              border: values.collectionDay === day
                                ? `2px solid ${primaryColor}`
                                : "2px solid #e0e0e0",
                              borderRadius: 2,
                              transition: "all 0.2s",
                              cursor: "pointer",
                              bgcolor: values.collectionDay === day ? "#f0f7f4" : "white",
                              "&:hover": {
                                borderColor: primaryLight,
                                boxShadow: 2,
                              },
                            }}
                            onClick={() => handleChange({ target: { name: "collectionDay", value: day } } as any)}
                          >
                            <FormControlLabel
                              value={day}
                              control={
                                <Radio
                                  sx={{
                                    color: primaryColor,
                                    "&.Mui-checked": { color: primaryColor },
                                  }}
                                />
                              }
                              label={
                                <Typography fontWeight={500} fontSize={{ xs: "0.95rem", sm: "1rem" }}>
                                  {day}
                                </Typography>
                              }
                              sx={{ m: 0, width: "100%" }}
                            />
                          </Paper>
                        ))}
                      </Stack>
                    </RadioGroup>

                    {errors.collectionDay && (
                      <Typography color="error" variant="caption" sx={{ mt: 1, display: "block" }}>
                        {errors.collectionDay}
                      </Typography>
                    )}
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  {/* Service Package Info */}
                  <Paper
                    sx={{
                      p: 2.5,
                      bgcolor: "#f0f7f4",
                      borderLeft: `4px solid ${primaryColor}`,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600} color={primaryColor} gutterBottom>
                      📦 Monthly Clean Package
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your bins will be professionally cleaned every month, ensuring they stay fresh, hygienic, and odor-free year-round.
                    </Typography>
                  </Paper>

                  {/* Additional Notes */}
                  <TextField
                    fullWidth
                    label="Additional Notes (Optional)"
                    name="extraInfo"
                    multiline
                    rows={3}
                    value={values.extraInfo}
                    onChange={handleChange}
                    placeholder="Any special instructions or requirements..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: primaryLight },
                        "&.Mui-focused fieldset": { borderColor: primaryColor },
                      },
                    }}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={status === "submitting"}
                    sx={{
                      py: { xs: 1.5, sm: 1.8 },
                      mt: 2,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      textTransform: "none",
                      bgcolor: primaryColor,
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryDark} 100%)`,
                      "&:hover": {
                        bgcolor: primaryDark,
                        background: `linear-gradient(135deg, ${primaryLight} 0%, ${primaryColor} 100%)`,
                        boxShadow: 6,
                      },
                      boxShadow: 4,
                      transition: "all 0.3s",
                    }}
                  >
                    {status === "submitting" ? (
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <CircularProgress size={24} color="inherit" />
                        <Typography>Processing...</Typography>
                      </Stack>
                    ) : (
                      "Submit Booking"
                    )}
                  </Button>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                    sx={{ pt: 1, display: "block" }}
                  >
                    We respect your privacy and will only use your information to provide our service.
                  </Typography>
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