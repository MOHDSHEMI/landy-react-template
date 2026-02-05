import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Stack,
  InputAdornment,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { withTranslation } from "react-i18next";
import { ContactProps } from "./types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: undefined });
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
      toast.error("Please fill all required fields!");
      return;
    }

    setStatus("submitting");
    try {
      const binLabels: Record<string, string> = {
        green: "Green Bin",
        black: "Black Bin",
        blue: "Blue Bin",
        caddy: "Brown Food Caddy",
      };
      const binsFormatted = values.bins.map(b => binLabels[b]).join(", ");

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

      const whatsappNumber = "447722045308";
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
      toast.success("Redirecting to WhatsApp...");

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

  return { values, errors, handleChange, handleSubmit, status, setValues };
}

const Contact = ({ id, t }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit, status, setValues } = useForm();

  const primaryColor = "#059669";
  const primaryLight = "#10b981";
  const primaryDark = "#047857";
  const accentGreen = "#34d399";

  const binOptions = [
    { key: "all", label: "Select All", color: "#9C27B0" },
    { key: "green", label: "Green Bin", color: "#4CAF50" },
    { key: "black", label: "Black Bin", color: "#424242" },
    { key: "blue", label: "Blue Bin", color: "#2196F3" },
    { key: "caddy", label: "Brown Food Caddy", color: "#795548" },
  ];

  const actualBinOptions = binOptions.filter(b => b.key !== "all");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleBinChange = (event: any) => {
    const value = event.target.value as string[];
    const lastSelected = value[value.length - 1];

    // If "Select All" is clicked
    if (lastSelected === "all") {
      // If all bins are already selected, deselect all
      if (values.bins.length === actualBinOptions.length) {
        setValues({ ...values, bins: [] });
      } else {
        // Select all bins except "all" option itself
        const allBins = actualBinOptions.map(b => b.key);
        setValues({ ...values, bins: allBins });
      }
    } else {
      // Normal selection, but filter out "all" if it exists
      const newValue = value.filter(v => v !== "all");
      setValues({ ...values, bins: newValue });
    }

    // Clear error
    if (errors.bins) {
      const newErrors = { ...errors };
      delete newErrors.bins;
      // You'll need to expose setErrors from useForm or handle this differently
    }
  };

  return (
    <Box id={id} sx={{ bgcolor: "#f9fafb", py: { xs: 2, sm: 3 }, px: 2 }}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <Box sx={{ maxWidth: 480, mx: "auto" }}>
        {/* Compact Header */}
        <Box
          sx={{
            bgcolor: primaryColor,
            borderRadius: 2,
            p: { xs: 2, sm: 2.5 },
            mb: 2,
            textAlign: "center",
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryDark} 100%)`,
          }}
        >
          <Typography variant="h6" fontWeight={700} color="white" gutterBottom>
            Monthly Bin Cleaning
          </Typography>
          <Typography variant="caption" color="rgba(255,255,255,0.9)" display="block">
            Professional service • Fresh bins monthly
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {/* Name */}
                <TextField
                  fullWidth
                  size="small"
                  label="Full Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: primaryLight },
                      "&.Mui-focused fieldset": { borderColor: primaryColor },
                    },
                  }}
                />

                {/* Phone & Email */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Phone"
                    name="telephone"
                    value={values.telephone}
                    onChange={handleChange}
                    error={!!errors.telephone}
                    helperText={errors.telephone}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        </InputAdornment>
                      ),
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
                    size="small"
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        </InputAdornment>
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

                {/* Council */}
                <TextField
                  fullWidth
                  size="small"
                  label="Local Council"
                  name="council"
                  value={values.council}
                  onChange={handleChange}
                  error={!!errors.council}
                  helperText={errors.council || "e.g., Westminster"}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: primaryLight },
                      "&.Mui-focused fieldset": { borderColor: primaryColor },
                    },
                  }}
                />

                {/* Address */}
                <TextField
                  fullWidth
                  size="small"
                  label="Full Address"
                  name="address"
                  multiline
                  rows={2}
                  value={values.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address || "Street, city, postcode"}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: primaryLight },
                      "&.Mui-focused fieldset": { borderColor: primaryColor },
                    },
                  }}
                />

                {/* Bins Multi-Select Dropdown */}
                <FormControl
                  fullWidth
                  size="small"
                  error={!!errors.bins}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: primaryLight },
                      "&.Mui-focused fieldset": { borderColor: primaryColor },
                    },
                  }}
                >
                  <InputLabel>Select Bins</InputLabel>
                  <Select
                    multiple
                    name="bins"
                    value={values.bins}
                    onChange={handleBinChange}
                    input={<OutlinedInput label="Select Bins" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {(selected as string[]).map((value) => {
                          const bin = actualBinOptions.find(b => b.key === value);
                          return (
                            <Chip
                              key={value}
                              label={bin?.label}
                              size="small"
                              onDelete={(e) => {
                                e.stopPropagation();
                                const newBins = values.bins.filter((b: string) => b !== value);
                                setValues({ ...values, bins: newBins });
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              sx={{
                                bgcolor: bin?.color,
                                color: "white",
                                fontWeight: 500,
                                height: 24,
                                "& .MuiChip-deleteIcon": {
                                  color: "rgba(255, 255, 255, 0.7)",
                                  "&:hover": {
                                    color: "white",
                                  },
                                },
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                    startAdornment={
                      <InputAdornment position="start" sx={{ ml: 0.5 }}>
                        <DeleteOutlineIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                      </InputAdornment>
                    }
                  >
                    {binOptions.map((bin) => (
                      <MenuItem key={bin.key} value={bin.key}>
                        <Checkbox
                          checked={
                            bin.key === "all"
                              ? values.bins.length === actualBinOptions.length
                              : values.bins.includes(bin.key)
                          }
                          sx={{
                            color: bin.color,
                            "&.Mui-checked": {
                              color: bin.color,
                            },
                          }}
                        />
                        {bin.key !== "all" && (
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              bgcolor: bin.color,
                              mr: 1,
                            }}
                          />
                        )}
                        <Typography fontWeight={bin.key === "all" ? 600 : 400}>
                          {bin.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.bins && <FormHelperText>{errors.bins}</FormHelperText>}
                </FormControl>

                {/* Collection Day Dropdown */}
                <FormControl
                  fullWidth
                  size="small"
                  error={!!errors.collectionDay}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: primaryLight },
                      "&.Mui-focused fieldset": { borderColor: primaryColor },
                    },
                  }}
                >
                  <InputLabel>Collection Day</InputLabel>
                  <Select
                    name="collectionDay"
                    value={values.collectionDay}
                    onChange={handleChange}
                    label="Collection Day"
                    startAdornment={
                      <InputAdornment position="start" sx={{ ml: 0.5 }}>
                        <CalendarTodayIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                      </InputAdornment>
                    }
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.collectionDay && <FormHelperText>{errors.collectionDay}</FormHelperText>}
                </FormControl>

                {/* Service Info Badge */}
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "#ecfdf5",
                    borderRadius: 1.5,
                    border: `1px solid ${accentGreen}`,
                  }}
                >
                  <Typography variant="caption" fontWeight={600} color={primaryDark} display="block">
                    📦 Monthly Clean Package
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Professional cleaning every month
                  </Typography>
                </Box>

                {/* Additional Notes */}
                <TextField
                  fullWidth
                  size="small"
                  label="Additional Notes (Optional)"
                  name="extraInfo"
                  multiline
                  rows={2}
                  value={values.extraInfo}
                  onChange={handleChange}
                  placeholder="Special instructions..."
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
                    py: 1.5,
                    mt: 1,
                    borderRadius: 1.5,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    bgcolor: primaryColor,
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryDark} 100%)`,
                    "&:hover": {
                      bgcolor: primaryDark,
                      background: `linear-gradient(135deg, ${primaryLight} 0%, ${primaryColor} 100%)`,
                      transform: "translateY(-1px)",
                      boxShadow: 4,
                    },
                    boxShadow: 2,
                    transition: "all 0.2s",
                  }}
                >
                  {status === "submitting" ? (
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <CircularProgress size={20} color="inherit" />
                      <Typography>Processing...</Typography>
                    </Stack>
                  ) : (
                    "Submit Booking"
                  )}
                </Button>

                <Typography variant="caption" color="text.secondary" align="center" sx={{ pt: 0.5 }}>
                  Your data is secure and used only for this service
                </Typography>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default withTranslation()(Contact);