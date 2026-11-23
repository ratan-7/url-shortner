### ** Product Overview**

**Product Name**: url-shortner.
**Product Types**: URL Shortening and Link Analytics Platform.
**Product Objective**: url-shortner is a web-based application that converts long URLs into short, shareable links while providing link management, expiration control, and advanced click analytics.

Example:

Original URL:https://example.com/products/electronics/
smartphone/samsung-galaxy

Short URL:https://url-shortner.app/aB91xK

### ** Problem Statement**

Sharing long URLs can be inconvenient.

**Common Problems:**

- Long URLs are difficult to remember and share.
- Managing links centrally is challenging.
- Tracking link performance is difficult.
- Insights into clicks, devices, and geographic traffic are often unavailable.
- Managing expired links can be complicated.

**url-shortner's Solution:**

url-shortner provides a centralized platform for URL shortening, link management, and advanced analytics, making it easier to create, manage, track, and optimize links from a single place.

## ** Target Users**

We will consider three types of users.

**Guest User**

Can generate short URLs without creating an account. Guest users will have access to limited features, and their URLs will have a lifetime of 7 days.

**Registered User**

Can create, manage, customize, and access analytics for URLs through their account.

**Administrator — Future Scope**

Admin functionality will be introduced in a future version to monitor platform abuse, detect suspicious URLs, and manage user accounts.

### ** Functional requirements**

These are the core features of url-shortner.

**FR-01: URL Shortening**

- Both guest and registered users can generate short URLs.
- The original URL will be validated.
- The system will generate a unique short code.
- Duplicate short codes will not be allowed.

**FR-02: User Authentication**

- User registration.
- User login.
- User logout.
- Authenticated profile access.
- Passwords will be securely hashed before storage.

**FR-03: Custom Alias**

- Only registered users can create custom aliases.
- Each alias must be unique.
- Already existing aliases will be rejected.
- Reserved system routes cannot be used as aliases.

**Examples:**

```text
url-shortner.app/my-portfolio
url-shortner.app/project-demo
```

**FR-04: URL Expiration**

**Guest Users:**

- Default URL lifetime: 7 days.
- Guest users cannot manually change the expiration date.

**Registered Users:**

- Users can select a custom expiration date.
- Users can also create URLs without an expiration date.

**FR-05: URL Management**

Registered users can:

- View a list of their URLs.
- View individual URL details.
- Deactivate URLs.
- Delete URLs.
- Update URL expiration dates.

Guest users will not have access to a permanent dashboard.
Guest users can manage their own URLs using a private management token.
Guest users can delete their own URLs before expiration.

**FR-06: URL Redirection**

- When a short URL is opened, the user will be redirected to the original URL.
- Invalid short codes will return HTTP 404.
- Expired URLs will return HTTP 410.
- Deactivated URLs will return HTTP 410.
- Valid URLs will use an HTTP 302 redirect.

**FR-07: Advanced Analytics**

Registered users can view analytics for their URLs.

**Analytics Metrics:**

| Metric           | Description                           |
| ---------------- | ------------------------------------- |
| Total Clicks     | Total recorded click events           |
| Unique Visitors  | Approximate number of unique visitors |
| Country          | Visitor's country                     |
| City             | Approximate visitor city              |
| Device           | Mobile / Desktop / Tablet             |
| Browser          | Chrome / Firefox, etc.                |
| Operating System | Android / Linux / Windows, etc.       |
| Referrer         | Traffic source                        |
| Daily Clicks     | Day-wise traffic                      |
| Hourly Clicks    | Hour-wise traffic                     |

**Guest Analytics:**

- A private access token will be issued for guest analytics.
- This token will be stored in the browser session.
- The token will not be exposed in the public URL.
- Guests can view analytics for their own links.
- Guests cannot access analytics belonging to other guests.

## ** User Permission Matrix**

The following table defines the permissions and feature access available to Guest and Registered users.

| Feature           | Guest User                   | Registered User |
| ----------------- | ---------------------------- | --------------- |
| Create URL        | Yes                          | Yes             |
| Custom Alias      | No                           | Yes             |
| Default Expiry    | 7 Days                       | Configurable    |
| URL Dashboard     | No                           | Yes             |
| Analytics         | Private Access Token         | Account         |
| Delete URL        | Via Private Management Token | Yes             |
| Manage Expiration | No                           | Yes             |
| Account History   | No                           | Yes             |

## ** User Journey**

**Guest User Flow**

1. Open the Shortify website.
2. Enter the original URL.
3. Click the **Generate** button.
4. The system generates a short URL with a 7-day expiration period.
5. Display the generated short URL and private analytics access.
6. Copy and share the shortened link.

**Registered User Flow**

1. Register or log in to an account.
2. Open the user dashboard.
3. Enter the original URL.
4. Optionally select a custom alias and expiration date.
5. Generate the short URL.
6. Manage URLs and view analytics through the dashboard.

## ** Non-Functional Product Expectations**

These are not functional features but rather quality expectations that define how Shortify should perform, scale, and operate.

| Category        | Requirement                                               |
| --------------- | --------------------------------------------------------- |
| Performance     | URL redirection should be optimized for low latency.      |
| Scalability     | The system should support multiple application instances. |
| Reliability     | Ensure unique URL codes and safe failure handling.        |
| Security        | Implement secure authentication and ownership protection. |
| Maintainability | Follow a modular backend architecture.                    |
| Privacy         | Avoid indefinite storage of raw IP addresses.             |
| Availability    | Handle dependency failures gracefully.                    |
| Observability   | Implement structured logging and error monitoring.        |

**Performance Targets:**

Actual response-time targets and load capacity benchmarks will be defined during the testing phase based on measured performance results.

## ** Scope Definition**

Scope control is important to ensure that the first version remains focused and manageable. Not every possible feature needs to be included in the initial release.

**MVP — Version 1**

**Must Build**

- Guest and registered URL creation.
- User authentication.
- Custom aliases for registered users.
- URL expiration management.
- URL redirection.
- URL management.
- Private guest analytics.
- Advanced analytics for registered users.
- Redis caching and rate limiting.

**Version 2 — Future Enhancements**

**Planned Features**

- QR code generation.
- Bulk URL shortening.
- Custom domains.
- Team accounts.
- Admin dashboard.
- Email notifications.

**Out of Scope**

**Not Planned**

- Mobile application.
- Paid subscriptions.
- Enterprise billing.
- Marketing automation.
