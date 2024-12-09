import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "../StyleSheets/HomePage.css";

const HomePage = () => {
  const [topics, setTopics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const fetchTrendingTopics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/trending/trending-topics",
        { withCredentials: true }
      );
      console.log("Trending Topics Response:", response.data);
      if (response.data && Array.isArray(response.data)) {
        const processedTopics = response.data.map((topic) => ({
          ...topic,
          name: topic.name,
        }));
        setTopics(processedTopics);
        setError(null);
      } else {
        console.warn("Invalid data format received:", response.data);
        setError(
          "Unable to load trending topics. Showing default topics instead."
        );
      }
    } catch (error) {
      console.error("Error fetching trending topics:", error);
      setError(
        "Failed to fetch trending topics. Showing default topics instead."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navbar showLoginButton={false} />
        <div className="homepage-content">
          <div className="loading">Loading trending topics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar showLoginButton={true} />
      <div className="homepage-content">
        <svg
          width="800"
          height="500"
          viewBox="0 0 85 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.416 4.32C10.416 5 10.176 5.588 9.696 6.084C9.216 6.572 8.516 6.924 7.596 7.14C8.092 7.276 8.468 7.5 8.724 7.812C8.98 8.116 9.108 8.468 9.108 8.868C9.108 9.5 8.908 10.048 8.508 10.512C8.116 10.976 7.54 11.336 6.78 11.592C6.02 11.84 5.104 11.964 4.032 11.964C3.632 11.964 3.312 11.952 3.072 11.928C3.064 12.152 2.968 12.32 2.784 12.432C2.6 12.544 2.364 12.6 2.076 12.6C1.788 12.6 1.588 12.536 1.476 12.408C1.372 12.28 1.328 12.092 1.344 11.844C1.416 10.724 1.556 9.552 1.764 8.328C1.972 7.096 2.236 5.908 2.556 4.764C2.612 4.564 2.724 4.424 2.892 4.344C3.06 4.264 3.28 4.224 3.552 4.224C4.04 4.224 4.284 4.36 4.284 4.632C4.284 4.744 4.26 4.872 4.212 5.016C4.004 5.64 3.796 6.488 3.588 7.56C3.38 8.624 3.232 9.64 3.144 10.608C3.528 10.64 3.84 10.656 4.08 10.656C5.2 10.656 6.02 10.496 6.54 10.176C7.068 9.848 7.332 9.432 7.332 8.928C7.332 8.576 7.18 8.28 6.876 8.04C6.58 7.8 6.08 7.668 5.376 7.644C5.216 7.636 5.104 7.596 5.04 7.524C4.976 7.452 4.944 7.336 4.944 7.176C4.944 6.944 4.992 6.756 5.088 6.612C5.184 6.468 5.36 6.392 5.616 6.384C6.184 6.368 6.696 6.284 7.152 6.132C7.616 5.98 7.98 5.768 8.244 5.496C8.508 5.216 8.64 4.892 8.64 4.524C8.64 4.06 8.412 3.696 7.956 3.432C7.5 3.16 6.8 3.024 5.856 3.024C5 3.024 4.172 3.136 3.372 3.36C2.572 3.576 1.892 3.852 1.332 4.188C1.076 4.34 0.86 4.416 0.684 4.416C0.54 4.416 0.428 4.368 0.348 4.272C0.276 4.168 0.24 4.04 0.24 3.888C0.24 3.688 0.28 3.516 0.36 3.372C0.448 3.228 0.652 3.064 0.972 2.88C1.644 2.496 2.432 2.196 3.336 1.98C4.24 1.764 5.164 1.656 6.108 1.656C7.556 1.656 8.636 1.9 9.348 2.388C10.06 2.876 10.416 3.52 10.416 4.32ZM15.0498 9.324C15.1538 9.324 15.2338 9.372 15.2898 9.468C15.3538 9.564 15.3858 9.696 15.3858 9.864C15.3858 10.184 15.3098 10.432 15.1578 10.608C14.8138 11.032 14.4378 11.38 14.0298 11.652C13.6298 11.924 13.1738 12.06 12.6618 12.06C11.9578 12.06 11.4338 11.74 11.0898 11.1C10.7538 10.46 10.5858 9.632 10.5858 8.616C10.5858 7.64 10.7098 6.528 10.9578 5.28C11.2138 4.032 11.5858 2.96 12.0738 2.064C12.5698 1.168 13.1578 0.719999 13.8378 0.719999C14.2218 0.719999 14.5218 0.899999 14.7378 1.26C14.9618 1.612 15.0738 2.12 15.0738 2.784C15.0738 3.736 14.8098 4.84 14.2818 6.096C13.7538 7.352 13.0378 8.596 12.1338 9.828C12.1898 10.156 12.2818 10.392 12.4098 10.536C12.5378 10.672 12.7058 10.74 12.9138 10.74C13.2418 10.74 13.5298 10.648 13.7778 10.464C14.0258 10.272 14.3418 9.948 14.7258 9.492C14.8218 9.38 14.9298 9.324 15.0498 9.324ZM13.5738 1.908C13.3898 1.908 13.1818 2.24 12.9498 2.904C12.7178 3.568 12.5138 4.392 12.3378 5.376C12.1618 6.36 12.0658 7.304 12.0498 8.208C12.6178 7.272 13.0698 6.336 13.4058 5.4C13.7418 4.456 13.9098 3.596 13.9098 2.82C13.9098 2.212 13.7978 1.908 13.5738 1.908ZM20.5358 8.316C20.6398 8.316 20.7198 8.368 20.7758 8.472C20.8318 8.576 20.8598 8.708 20.8598 8.868C20.8598 9.252 20.7438 9.48 20.5118 9.552C20.0318 9.72 19.5038 9.816 18.9278 9.84C18.7758 10.512 18.4758 11.052 18.0278 11.46C17.5798 11.86 17.0718 12.06 16.5038 12.06C16.0238 12.06 15.6118 11.944 15.2678 11.712C14.9318 11.48 14.6758 11.172 14.4998 10.788C14.3238 10.404 14.2358 9.988 14.2358 9.54C14.2358 8.932 14.3518 8.392 14.5838 7.92C14.8158 7.44 15.1358 7.068 15.5438 6.804C15.9518 6.532 16.4038 6.396 16.8998 6.396C17.5078 6.396 17.9958 6.608 18.3638 7.032C18.7398 7.448 18.9598 7.964 19.0238 8.58C19.3998 8.556 19.8478 8.476 20.3678 8.34C20.4318 8.324 20.4878 8.316 20.5358 8.316ZM16.5998 10.788C16.8558 10.788 17.0758 10.684 17.2598 10.476C17.4518 10.268 17.5798 9.968 17.6438 9.576C17.3958 9.408 17.2038 9.188 17.0678 8.916C16.9398 8.644 16.8758 8.356 16.8758 8.052C16.8758 7.924 16.8878 7.796 16.9118 7.668H16.8518C16.5318 7.668 16.2638 7.824 16.0478 8.136C15.8398 8.44 15.7358 8.872 15.7358 9.432C15.7358 9.872 15.8198 10.208 15.9878 10.44C16.1638 10.672 16.3678 10.788 16.5998 10.788ZM25.9739 9.348C26.0779 9.348 26.1579 9.4 26.2139 9.504C26.2779 9.6 26.3099 9.724 26.3099 9.876C26.3099 10.06 26.2819 10.204 26.2259 10.308C26.1699 10.412 26.0819 10.504 25.9619 10.584C25.2739 11.048 24.7699 11.392 24.4499 11.616L23.6819 12.132C23.3779 13.788 22.9779 15.088 22.4819 16.032C21.9939 16.984 21.3699 17.46 20.6099 17.46C20.2019 17.46 19.8699 17.332 19.6139 17.076C19.3579 16.828 19.2299 16.5 19.2299 16.092C19.2299 15.524 19.4539 14.912 19.9019 14.256C20.3499 13.608 21.1899 12.808 22.4219 11.856L22.4939 11.388C22.3579 11.604 22.1779 11.772 21.9539 11.892C21.7379 12.004 21.5219 12.06 21.3059 12.06C20.8099 12.06 20.4139 11.88 20.1179 11.52C19.8219 11.16 19.6739 10.688 19.6739 10.104C19.6739 9.464 19.8219 8.86 20.1179 8.292C20.4139 7.716 20.8059 7.256 21.2939 6.912C21.7899 6.56 22.3139 6.384 22.8659 6.384C23.0419 6.384 23.1579 6.42 23.2139 6.492C23.2779 6.556 23.3299 6.676 23.3699 6.852C23.5219 6.82 23.6979 6.804 23.8979 6.804C24.0979 6.804 24.2379 6.836 24.3179 6.9C24.4059 6.956 24.4499 7.072 24.4499 7.248C24.4499 7.344 24.4459 7.42 24.4379 7.476C24.4059 7.724 24.3059 8.352 24.1379 9.36C24.1059 9.552 24.0699 9.764 24.0299 9.996C23.9979 10.22 23.9619 10.46 23.9219 10.716C24.5379 10.236 25.1299 9.812 25.6979 9.444C25.8019 9.38 25.8939 9.348 25.9739 9.348ZM21.7379 10.848C21.9219 10.848 22.0979 10.736 22.2659 10.512C22.4339 10.288 22.5539 9.968 22.6259 9.552L23.0099 7.5C22.6819 7.508 22.3779 7.636 22.0979 7.884C21.8179 8.124 21.5939 8.444 21.4259 8.844C21.2579 9.244 21.1739 9.668 21.1739 10.116C21.1739 10.364 21.2219 10.548 21.3179 10.668C21.4219 10.788 21.5619 10.848 21.7379 10.848ZM20.7419 16.296C20.9419 16.296 21.1659 16.056 21.4139 15.576C21.6699 15.096 21.9139 14.332 22.1459 13.284C21.5299 13.812 21.0859 14.288 20.8139 14.712C20.5419 15.136 20.4059 15.508 20.4059 15.828C20.4059 15.964 20.4299 16.076 20.4779 16.164C20.5339 16.252 20.6219 16.296 20.7419 16.296ZM31.5989 9.348C31.7029 9.348 31.7829 9.4 31.8389 9.504C31.9029 9.6 31.9349 9.724 31.9349 9.876C31.9349 10.06 31.9069 10.204 31.8509 10.308C31.7949 10.412 31.7069 10.504 31.5869 10.584C30.8989 11.048 30.3949 11.392 30.0749 11.616L29.3069 12.132C29.0029 13.788 28.6029 15.088 28.1069 16.032C27.6189 16.984 26.9949 17.46 26.2349 17.46C25.8269 17.46 25.4949 17.332 25.2389 17.076C24.9829 16.828 24.8549 16.5 24.8549 16.092C24.8549 15.524 25.0789 14.912 25.5269 14.256C25.9749 13.608 26.8149 12.808 28.0469 11.856L28.1189 11.388C27.9829 11.604 27.8029 11.772 27.5789 11.892C27.3629 12.004 27.1469 12.06 26.9309 12.06C26.4349 12.06 26.0389 11.88 25.7429 11.52C25.4469 11.16 25.2989 10.688 25.2989 10.104C25.2989 9.464 25.4469 8.86 25.7429 8.292C26.0389 7.716 26.4309 7.256 26.9189 6.912C27.4149 6.56 27.9389 6.384 28.4909 6.384C28.6669 6.384 28.7829 6.42 28.8389 6.492C28.9029 6.556 28.9549 6.676 28.9949 6.852C29.1469 6.82 29.3229 6.804 29.5229 6.804C29.7229 6.804 29.8629 6.836 29.9429 6.9C30.0309 6.956 30.0749 7.072 30.0749 7.248C30.0749 7.344 30.0709 7.42 30.0629 7.476C30.0309 7.724 29.9309 8.352 29.7629 9.36C29.7309 9.552 29.6949 9.764 29.6549 9.996C29.6229 10.22 29.5869 10.46 29.5469 10.716C30.1629 10.236 30.7549 9.812 31.3229 9.444C31.4269 9.38 31.5189 9.348 31.5989 9.348ZM27.3629 10.848C27.5469 10.848 27.7229 10.736 27.8909 10.512C28.0589 10.288 28.1789 9.968 28.2509 9.552L28.6349 7.5C28.3069 7.508 28.0029 7.636 27.7229 7.884C27.4429 8.124 27.2189 8.444 27.0509 8.844C26.8829 9.244 26.7989 9.668 26.7989 10.116C26.7989 10.364 26.8469 10.548 26.9429 10.668C27.0469 10.788 27.1869 10.848 27.3629 10.848ZM26.3669 16.296C26.5669 16.296 26.7909 16.056 27.0389 15.576C27.2949 15.096 27.5389 14.332 27.7709 13.284C27.1549 13.812 26.7109 14.288 26.4389 14.712C26.1669 15.136 26.0309 15.508 26.0309 15.828C26.0309 15.964 26.0549 16.076 26.1029 16.164C26.1589 16.252 26.2469 16.296 26.3669 16.296ZM36.5491 9.324C36.6531 9.324 36.7331 9.372 36.7891 9.468C36.8531 9.564 36.8851 9.696 36.8851 9.864C36.8851 10.184 36.8091 10.432 36.6571 10.608C36.3611 10.968 35.9411 11.3 35.3971 11.604C34.8611 11.908 34.2851 12.06 33.6691 12.06C32.8291 12.06 32.1771 11.832 31.7131 11.376C31.2491 10.92 31.0171 10.296 31.0171 9.504C31.0171 8.952 31.1331 8.44 31.3651 7.968C31.5971 7.488 31.9171 7.108 32.3251 6.828C32.7411 6.548 33.2091 6.408 33.7291 6.408C34.1931 6.408 34.5651 6.548 34.8451 6.828C35.1251 7.1 35.2651 7.472 35.2651 7.944C35.2651 8.496 35.0651 8.972 34.6651 9.372C34.2731 9.764 33.6051 10.076 32.6611 10.308C32.8611 10.676 33.2411 10.86 33.8011 10.86C34.1611 10.86 34.5691 10.736 35.0251 10.488C35.4891 10.232 35.8891 9.9 36.2251 9.492C36.3211 9.38 36.4291 9.324 36.5491 9.324ZM33.5251 7.584C33.2291 7.584 32.9771 7.756 32.7691 8.1C32.5691 8.444 32.4691 8.86 32.4691 9.348V9.372C32.9411 9.26 33.3131 9.092 33.5851 8.868C33.8571 8.644 33.9931 8.384 33.9931 8.088C33.9931 7.936 33.9491 7.816 33.8611 7.728C33.7811 7.632 33.6691 7.584 33.5251 7.584ZM40.756 8.052C40.932 8.052 41.08 8.116 41.2 8.244C41.328 8.364 41.392 8.516 41.392 8.7C41.392 8.804 41.368 8.916 41.32 9.036C41.192 9.332 41.012 9.58 40.78 9.78C40.548 9.98 40.292 10.08 40.012 10.08C39.788 10.08 39.596 10 39.436 9.84C39.284 9.68 39.208 9.464 39.208 9.192C39.208 9.04 39.216 8.876 39.232 8.7C39.248 8.572 39.256 8.484 39.256 8.436C39.256 8.372 39.24 8.324 39.208 8.292C39.184 8.26 39.152 8.244 39.112 8.244C39 8.244 38.848 8.38 38.656 8.652C38.464 8.916 38.272 9.268 38.08 9.708C37.888 10.148 37.732 10.612 37.612 11.1C37.524 11.484 37.424 11.74 37.312 11.868C37.2 11.996 37.016 12.06 36.76 12.06C36.456 12.06 36.24 11.9 36.112 11.58C35.992 11.26 35.932 10.748 35.932 10.044C35.932 9.004 36.08 8.016 36.376 7.08C36.448 6.848 36.564 6.68 36.724 6.576C36.892 6.464 37.124 6.408 37.42 6.408C37.58 6.408 37.692 6.428 37.756 6.468C37.82 6.508 37.852 6.584 37.852 6.696C37.852 6.824 37.792 7.112 37.672 7.56C37.592 7.88 37.528 8.16 37.48 8.4C37.432 8.64 37.392 8.936 37.36 9.288C37.624 8.6 37.92 8.04 38.248 7.608C38.576 7.176 38.896 6.868 39.208 6.684C39.52 6.5 39.804 6.408 40.06 6.408C40.292 6.408 40.468 6.476 40.588 6.612C40.716 6.74 40.78 6.932 40.78 7.188C40.78 7.34 40.736 7.628 40.648 8.052H40.756ZM48.3732 12.096C47.3092 12.096 46.4572 11.896 45.8172 11.496C45.1772 11.088 44.8572 10.468 44.8572 9.636C44.8572 9.196 44.9332 8.86 45.0852 8.628C45.2372 8.396 45.4612 8.28 45.7572 8.28C45.9732 8.28 46.1492 8.336 46.2852 8.448C46.4212 8.56 46.4892 8.704 46.4892 8.88C46.4892 9.04 46.4772 9.18 46.4532 9.3C46.4532 9.332 46.4452 9.388 46.4292 9.468C46.4212 9.548 46.4172 9.632 46.4172 9.72C46.4172 10.08 46.5972 10.348 46.9572 10.524C47.3252 10.7 47.8372 10.788 48.4932 10.788C49.1732 10.788 49.7052 10.668 50.0892 10.428C50.4732 10.18 50.6652 9.836 50.6652 9.396C50.6652 9.124 50.5772 8.892 50.4012 8.7C50.2252 8.5 50.0052 8.336 49.7412 8.208C49.4772 8.072 49.1052 7.908 48.6252 7.716C48.0092 7.476 47.5052 7.248 47.1132 7.032C46.7292 6.816 46.3972 6.524 46.1172 6.156C45.8452 5.78 45.7092 5.316 45.7092 4.764C45.7092 4.188 45.8612 3.676 46.1652 3.228C46.4772 2.78 46.9212 2.432 47.4972 2.184C48.0812 1.936 48.7652 1.812 49.5492 1.812C50.1332 1.812 50.6692 1.9 51.1572 2.076C51.6452 2.244 52.0332 2.504 52.3212 2.856C52.6172 3.208 52.7652 3.64 52.7652 4.152C52.7652 4.656 52.6892 5.036 52.5372 5.292C52.3852 5.548 52.1612 5.676 51.8652 5.676C51.6572 5.676 51.4812 5.612 51.3372 5.484C51.2012 5.356 51.1332 5.204 51.1332 5.028C51.1332 4.876 51.1452 4.736 51.1692 4.608C51.1932 4.368 51.2052 4.216 51.2052 4.152C51.2052 3.816 51.0412 3.56 50.7132 3.384C50.3852 3.208 49.9772 3.12 49.4892 3.12C48.8012 3.12 48.2732 3.248 47.9052 3.504C47.5452 3.752 47.3652 4.104 47.3652 4.56C47.3652 4.864 47.4572 5.124 47.6412 5.34C47.8332 5.556 48.0692 5.736 48.3492 5.88C48.6292 6.024 49.0212 6.196 49.5252 6.396C50.1332 6.644 50.6212 6.868 50.9892 7.068C51.3572 7.268 51.6692 7.54 51.9252 7.884C52.1892 8.228 52.3212 8.652 52.3212 9.156C52.3212 10.1 51.9612 10.828 51.2412 11.34C50.5292 11.844 49.5732 12.096 48.3732 12.096ZM59.7535 9.324C59.8575 9.324 59.9375 9.372 59.9935 9.468C60.0575 9.564 60.0895 9.696 60.0895 9.864C60.0895 10.184 60.0135 10.432 59.8615 10.608C59.5175 11.032 59.1455 11.38 58.7455 11.652C58.3535 11.924 57.9055 12.06 57.4015 12.06C56.9775 12.06 56.6335 11.908 56.3695 11.604C55.9135 11.9 55.4375 12.052 54.9415 12.06C54.8375 13.604 54.6015 14.892 54.2335 15.924C53.8655 16.964 53.3255 17.484 52.6135 17.484C52.1815 17.484 51.8615 17.328 51.6535 17.016C51.4455 16.704 51.3415 16.272 51.3415 15.72C51.3415 14.936 51.5215 14.02 51.8815 12.972C52.2415 11.932 52.7975 10.784 53.5495 9.528C53.5495 8.36 53.5415 7.548 53.5255 7.092C53.5175 6.86 53.6095 6.676 53.8015 6.54C53.9935 6.404 54.2335 6.336 54.5215 6.336C54.6895 6.336 54.8095 6.372 54.8815 6.444C54.9615 6.508 55.0055 6.64 55.0135 6.84C55.0135 7.04 55.0175 7.188 55.0255 7.284C55.2815 6.964 55.5335 6.736 55.7815 6.6C56.0295 6.456 56.2935 6.384 56.5735 6.384C57.0215 6.384 57.3855 6.564 57.6655 6.924C57.9535 7.284 58.0975 7.756 58.0975 8.34C58.0975 8.764 58.0295 9.176 57.8935 9.576C57.7575 9.976 57.5695 10.34 57.3295 10.668C57.4975 10.716 57.6375 10.74 57.7495 10.74C58.0135 10.74 58.2655 10.644 58.5055 10.452C58.7455 10.26 59.0535 9.94 59.4295 9.492C59.5255 9.38 59.6335 9.324 59.7535 9.324ZM55.0015 10.908C55.2895 10.844 55.5535 10.688 55.7935 10.44C56.0415 10.184 56.2375 9.872 56.3815 9.504C56.5255 9.128 56.5975 8.736 56.5975 8.328C56.5975 8.088 56.5495 7.908 56.4535 7.788C56.3575 7.66 56.2295 7.596 56.0695 7.596C55.7815 7.596 55.4335 7.9 55.0255 8.508C55.0175 8.86 55.0135 9.376 55.0135 10.056C55.0135 10.424 55.0095 10.708 55.0015 10.908ZM52.7095 16.308C52.9255 16.308 53.1055 15.836 53.2495 14.892C53.3935 13.956 53.4855 12.788 53.5255 11.388C53.1815 12.188 52.9095 12.952 52.7095 13.68C52.5095 14.408 52.4095 15.02 52.4095 15.516C52.4095 15.772 52.4415 15.968 52.5055 16.104C52.5615 16.24 52.6295 16.308 52.7095 16.308ZM65.2429 8.316C65.3469 8.316 65.4269 8.368 65.4829 8.472C65.5389 8.576 65.5669 8.708 65.5669 8.868C65.5669 9.252 65.4509 9.48 65.2189 9.552C64.7389 9.72 64.2109 9.816 63.6349 9.84C63.4829 10.512 63.1829 11.052 62.7349 11.46C62.2869 11.86 61.7789 12.06 61.2109 12.06C60.7309 12.06 60.3189 11.944 59.9749 11.712C59.6389 11.48 59.3829 11.172 59.2069 10.788C59.0309 10.404 58.9429 9.988 58.9429 9.54C58.9429 8.932 59.0589 8.392 59.2909 7.92C59.5229 7.44 59.8429 7.068 60.2509 6.804C60.6589 6.532 61.1109 6.396 61.6069 6.396C62.2149 6.396 62.7029 6.608 63.0709 7.032C63.4469 7.448 63.6669 7.964 63.7309 8.58C64.1069 8.556 64.5549 8.476 65.0749 8.34C65.1389 8.324 65.1949 8.316 65.2429 8.316ZM61.3069 10.788C61.5629 10.788 61.7829 10.684 61.9669 10.476C62.1589 10.268 62.2869 9.968 62.3509 9.576C62.1029 9.408 61.9109 9.188 61.7749 8.916C61.6469 8.644 61.5829 8.356 61.5829 8.052C61.5829 7.924 61.5949 7.796 61.6189 7.668H61.5589C61.2389 7.668 60.9709 7.824 60.7549 8.136C60.5469 8.44 60.4429 8.872 60.4429 9.432C60.4429 9.872 60.5269 10.208 60.6949 10.44C60.8709 10.672 61.0749 10.788 61.3069 10.788ZM73.9496 9.324C74.0536 9.324 74.1336 9.372 74.1896 9.468C74.2536 9.564 74.2856 9.696 74.2856 9.864C74.2856 10.184 74.2096 10.432 74.0576 10.608C73.7136 11.032 73.3376 11.38 72.9296 11.652C72.5216 11.924 72.0536 12.06 71.5256 12.06C70.5496 12.06 69.8696 11.652 69.4856 10.836C69.2776 11.172 69.0016 11.46 68.6576 11.7C68.3136 11.94 67.9456 12.06 67.5536 12.06C66.7936 12.06 66.2336 11.752 65.8736 11.136C65.5216 10.512 65.3456 9.672 65.3456 8.616C65.3456 8.224 65.3656 7.788 65.4056 7.308H64.9136C64.6736 7.308 64.5096 7.264 64.4216 7.176C64.3416 7.088 64.3016 6.948 64.3016 6.756C64.3016 6.308 64.4816 6.084 64.8416 6.084H65.5736C65.7256 5.236 65.9376 4.468 66.2096 3.78C66.4816 3.092 66.8096 2.544 67.1936 2.136C67.5776 1.728 67.9936 1.524 68.4416 1.524C68.7776 1.524 69.0416 1.672 69.2336 1.968C69.4256 2.264 69.5216 2.636 69.5216 3.084C69.5216 4.212 69.0856 5.212 68.2136 6.084H69.3056C69.4576 5.236 69.6696 4.468 69.9416 3.78C70.2136 3.092 70.5416 2.544 70.9256 2.136C71.3096 1.728 71.7256 1.524 72.1736 1.524C72.5096 1.524 72.7736 1.672 72.9656 1.968C73.1576 2.264 73.2536 2.636 73.2536 3.084C73.2536 4.212 72.8176 5.212 71.9456 6.084H73.0376C73.1656 6.084 73.2576 6.112 73.3136 6.168C73.3696 6.224 73.3976 6.328 73.3976 6.48C73.3976 7.032 72.9456 7.308 72.0416 7.308H70.5896C70.5656 7.692 70.5536 8.084 70.5536 8.484C70.5536 9.316 70.6496 9.9 70.8416 10.236C71.0416 10.572 71.3536 10.74 71.7776 10.74C72.1216 10.74 72.4256 10.636 72.6896 10.428C72.9536 10.22 73.2656 9.908 73.6256 9.492C73.7216 9.38 73.8296 9.324 73.9496 9.324ZM68.1176 2.676C67.9976 2.676 67.8616 2.828 67.7096 3.132C67.5656 3.428 67.4256 3.844 67.2896 4.38C67.1616 4.908 67.0536 5.496 66.9656 6.144C67.4376 5.736 67.7896 5.28 68.0216 4.776C68.2616 4.264 68.3816 3.8 68.3816 3.384C68.3816 2.912 68.2936 2.676 68.1176 2.676ZM71.8496 2.676C71.7296 2.676 71.5936 2.828 71.4416 3.132C71.2976 3.428 71.1576 3.844 71.0216 4.38C70.8936 4.908 70.7856 5.496 70.6976 6.144C71.1696 5.736 71.5216 5.28 71.7536 4.776C71.9936 4.264 72.1136 3.8 72.1136 3.384C72.1136 2.912 72.0256 2.676 71.8496 2.676ZM67.8056 10.74C68.0456 10.74 68.2856 10.628 68.5256 10.404C68.7656 10.18 68.9696 9.904 69.1376 9.576C69.0976 9.328 69.0776 9.008 69.0776 8.616C69.0776 8.224 69.0976 7.788 69.1376 7.308H66.8576C66.8336 7.692 66.8216 8.084 66.8216 8.484C66.8216 9.292 66.9056 9.872 67.0736 10.224C67.2496 10.568 67.4936 10.74 67.8056 10.74ZM78.6663 9.324C78.7703 9.324 78.8503 9.372 78.9063 9.468C78.9703 9.564 79.0023 9.696 79.0023 9.864C79.0023 10.184 78.9263 10.432 78.7743 10.608C78.4783 10.968 78.0583 11.3 77.5143 11.604C76.9783 11.908 76.4023 12.06 75.7863 12.06C74.9463 12.06 74.2943 11.832 73.8303 11.376C73.3663 10.92 73.1343 10.296 73.1343 9.504C73.1343 8.952 73.2503 8.44 73.4823 7.968C73.7143 7.488 74.0343 7.108 74.4423 6.828C74.8583 6.548 75.3263 6.408 75.8463 6.408C76.3103 6.408 76.6823 6.548 76.9623 6.828C77.2423 7.1 77.3823 7.472 77.3823 7.944C77.3823 8.496 77.1823 8.972 76.7823 9.372C76.3903 9.764 75.7223 10.076 74.7783 10.308C74.9783 10.676 75.3583 10.86 75.9183 10.86C76.2783 10.86 76.6863 10.736 77.1423 10.488C77.6063 10.232 78.0063 9.9 78.3423 9.492C78.4383 9.38 78.5463 9.324 78.6663 9.324ZM75.6423 7.584C75.3463 7.584 75.0943 7.756 74.8863 8.1C74.6863 8.444 74.5863 8.86 74.5863 9.348V9.372C75.0583 9.26 75.4303 9.092 75.7023 8.868C75.9743 8.644 76.1103 8.384 76.1103 8.088C76.1103 7.936 76.0663 7.816 75.9783 7.728C75.8983 7.632 75.7863 7.584 75.6423 7.584ZM82.3346 9.324C82.4226 9.98 82.5506 10.628 82.7186 11.268C82.7506 11.372 82.7666 11.48 82.7666 11.592C82.7666 11.952 82.5466 12.132 82.1066 12.132C81.8586 12.132 81.6666 12.064 81.5306 11.928C81.4026 11.792 81.2826 11.536 81.1706 11.16L81.1586 11.112C80.8546 11.488 80.5786 11.74 80.3306 11.868C80.0906 11.996 79.8106 12.06 79.4906 12.06C79.0026 12.06 78.5986 11.88 78.2786 11.52C77.9666 11.152 77.8106 10.676 77.8106 10.092C77.8106 9.452 77.9466 8.86 78.2186 8.316C78.4906 7.772 78.8626 7.328 79.3346 6.984C79.8066 6.632 80.3346 6.42 80.9186 6.348C81.0706 4.836 81.3586 3.52 81.7826 2.4C82.2146 1.28 82.7866 0.719999 83.4986 0.719999C83.8426 0.719999 84.1266 0.875999 84.3506 1.188C84.5826 1.5 84.6986 1.972 84.6986 2.604C84.6986 3.484 84.4826 4.512 84.0506 5.688C83.6186 6.864 83.0466 8.076 82.3346 9.324ZM83.3666 1.896C83.1346 1.896 82.9146 2.488 82.7066 3.672C82.5066 4.856 82.3706 6.144 82.2986 7.536C83.1866 5.616 83.6306 4.056 83.6306 2.856C83.6306 2.552 83.6026 2.316 83.5466 2.148C83.4986 1.98 83.4386 1.896 83.3666 1.896ZM79.9106 10.848C80.0706 10.848 80.2226 10.788 80.3666 10.668C80.5186 10.548 80.7106 10.316 80.9426 9.972C80.8626 9.388 80.8226 8.784 80.8226 8.16C80.8226 7.912 80.8266 7.72 80.8346 7.584C80.3946 7.712 80.0306 8.004 79.7426 8.46C79.4546 8.916 79.3106 9.42 79.3106 9.972C79.3106 10.556 79.5106 10.848 79.9106 10.848Z"
            fill="red"
          />
        </svg>
        <h1 className="trending-title">Trending Topics This Week</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="topic-grid">
          {topics.map((topic, index) => (
            <Link
              to={`/topic/${encodeURIComponent(topic.name)}`}
              key={index}
              className="topic-box"
              style={{
                background: `linear-gradient(135deg, var(--accent-${
                  (index % 3) + 1
                }), var(--secondary-bg))`,
              }}
            >
              <div className="topic-content">
                <span className="topic-name">{topic.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
