import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Stack,
    Paper,
    Skeleton,
} from "@mui/material";
import Circle from "@mui/icons-material/Circle";
import { colors } from "../constants";
import GridSVG from "./GridSVG";
import { Link } from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function BuilderCard(props) {
    const { width = "352px", height = "300px" } = props;
    const bottomStripColor = {
        0: {
            text: "#42a5f5",
            background: "#cce8ff",
            tag: "Room opening soon",
        },
        1: {
            text: "#388e3c",
            background: "#dffce1",
            tag: "Room live",
        },
        2: {
            text: "#f57c00",
            background: "#ffddab",
            tag: "Room expired",
        },
    };

    const getColor = () => {
        return colors[Math.floor(Math.random() * 16)];
    };

    const makeColor = () => {
        let color = Array.from({ length: 32 }, () =>
            Array.from({ length: 32 }, () => [getColor()])
        );
        return color;
    };

    return (
        <Card
            sx={{
                width: width,
                height: "fit-content",
                borderRadius: "16px",
                minWidth: "250px",
                minHeight: "400px",
                border: "1px solid rgb(233, 232, 232)",
            }}
        >
            <CardActionArea sx={{
                cursor: "auto"
            }}>
                {false ? (
                    <CardSkeleton />
                ) : (
                    <Box
                        sx={{ textDecoration: "none !important" }}
                    >
                        <Box
                            sx={{
                                width: "calc(100% - 32px)",
                                height: "320px",
                                borderRadius: "10px",
                                margin: "16px 16px 0 16px",
                                background: "gray",
                                overflow: "hidden",
                            }}
                        >
                            <img src={props.link} id="sayanImage" />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: "'Fredoka One', cursive",
                                margin: "0 auto",
                                marginTop: "15px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                lineClamp: 2,
                                WebkitLineClamp: 2,
                                "-webkit-box-orient": "vertical",
                                width: "calc(100% - 32px)",
                            }}
                        >
                            {props.name}
                        </Typography>
                        <Stack direction="row" sx={{ margin: "20px 0", justifyContent: "space-evenly", }}>
                            <a href={props.twitter}>
                                <TwitterIcon
                                    sx={{
                                        color: "rgb(29, 155, 240)",
                                        fontSize: "2rem",
                                    }}
                                />
                            </a>
                            <a href={props.github}>
                                <GitHubIcon
                                    sx={{
                                        fontSize: "2rem",
                                    }}
                                />
                            </a>
                            <a href={props.linkedin}>
                                <LinkedInIcon
                                    sx={{
                                        fontSize: "2rem",
                                        color: "#0077b5",
                                    }}
                                />
                            </a>
                        </Stack>
                    </Box>
                )}
            </CardActionArea>
        </Card>
    );
}

const CardSkeleton = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "352px",
                padding: "16px 0",
                height: "504px",
                justifyContent: "space-between",
            }}
        >
            <Skeleton
                variant="rectangular"
                width={320}
                height={320}
                sx={{ borderRadius: "10px" }}
            />
            <Skeleton
                variant="rectangular"
                width={320}
                height={30}
                sx={{ borderRadius: "10px" }}
            />
            <Skeleton
                variant="rectangular"
                width={320}
                height={30}
                sx={{ borderRadius: "10px" }}
            />
            <Skeleton
                variant="rectangular"
                width={320}
                height={30}
                sx={{ borderRadius: "10px" }}
            />
        </Box>
    );
};
