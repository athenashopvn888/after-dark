"use client";
/* eslint-disable @next/next/no-img-element -- local blob previews cannot use the image optimizer */

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./staffPhoto.module.css";

type Prompt = { key: string; label: string };
type StaffStatus = {
  store: { code: string; name: string };
  dayKey: string;
  submissions: Array<{ id: string; slot: number; prompt_key: string; status: string }>;
  requiredComplete: boolean;
  optionalComplete: boolean;
  availablePrompts: Prompt[];
};
type PageTab = "photo" | "boss";
type IdentityChoice = "named" | "anonymous";

const BOSS_CATEGORIES = [
  "Concern",
  "Improvement idea",
  "Promotion or marketing idea",
  "Customer feedback",
  "Workplace or team concern",
  "Need help",
  "Good news or shout-out",
  "I miss the boss",
  "Other",
];

function previewStatus(): StaffStatus {
  return {
    store: { code: "MJ01", name: "After Dark Cannabis" },
    dayKey: "2026-07-25",
    submissions: [],
    requiredComplete: false,
    optionalComplete: false,
    availablePrompts: [
      { key: "storefront-front", label: "Front storefront and sign" },
      { key: "interior-wide", label: "Wide interior view" },
      { key: "counter-clean", label: "Clean checkout area" },
    ],
  };
}

async function apiJson(url: string, init?: RequestInit) {
  const response = await fetch(url, { ...init, cache: "no-store" });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) throw new Error(result.error || "Something went wrong. Please try again.");
  return result;
}

async function redrawImage(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Choose a photo or screenshot.");
  const bitmap = await createImageBitmap(file);
  const max = 1600;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This photo could not be prepared.");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.84));
  if (!blob) throw new Error("This photo could not be prepared.");
  if (blob.size > 5 * 1024 * 1024) throw new Error("Photo is too large. Take it again at a lower resolution.");
  return new File([blob], "mj-staff-photo.jpg", { type: "image/jpeg", lastModified: Date.now() });
}

export default function StaffPhotoApp({ previewMode = null }: { previewMode?: "login" | "dashboard" | "boss" | null }) {
  const isPreview = previewMode !== null;
  const [authKnown, setAuthKnown] = useState(isPreview);
  const [authenticated, setAuthenticated] = useState(previewMode === "dashboard" || previewMode === "boss");
  const [status, setStatus] = useState<StaffStatus | null>(previewMode === "dashboard" || previewMode === "boss" ? previewStatus() : null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<PageTab>(previewMode === "boss" ? "boss" : "photo");
  const [promptKey, setPromptKey] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [bossCategory, setBossCategory] = useState("");
  const [identityChoice, setIdentityChoice] = useState<IdentityChoice>("named");
  const [staffName, setStaffName] = useState(previewMode === "dashboard" || previewMode === "boss" ? "Demo" : "");
  const cameraRef = useRef<HTMLInputElement>(null);

  async function loadStatus() {
    try {
      const response = await fetch("/api/staff-photo/status", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        setStatus(null);
        return;
      }
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Could not load today's task.");
      setStatus(result);
      setAuthenticated(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load today's task.");
    } finally {
      setAuthKnown(true);
    }
  }

  useEffect(() => {
    if (isPreview) return;
    const timer = window.setTimeout(() => void loadStatus(), 0);
    return () => window.clearTimeout(timer);
  }, [isPreview]);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  function showTab(tab: PageTab) {
    setActiveTab(tab);
    setError("");
    setMessage("");
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    if (isPreview) {
      setAuthenticated(true);
      setStatus(previewStatus());
      setBusy(false);
      return;
    }
    const loginData = new FormData(event.currentTarget);
    const pin = String(loginData.get("pin") || "");
    const enteredName = String(loginData.get("staffName") || "").trim();
    try {
      await apiJson("/api/staff-photo/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pin, staffName: enteredName }),
      });
      setStaffName(enteredName);
      event.currentTarget.reset();
      await loadStatus();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function choosePhoto(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    setMessage("Preparing photo...");
    try {
      const prepared = await redrawImage(file);
      if (preview) URL.revokeObjectURL(preview);
      setPhoto(prepared);
      setPreview(URL.createObjectURL(prepared));
      setMessage("Photo ready. Check it, then submit.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not prepare photo.");
      setMessage("");
    } finally {
      setBusy(false);
    }
  }

  function clearPhoto() {
    if (preview) URL.revokeObjectURL(preview);
    setPhoto(null);
    setPreview("");
    setMessage("");
    if (cameraRef.current) cameraRef.current.value = "";
  }

  async function submitPhoto() {
    if (!photo || !promptKey) {
      setError("Choose a shot type and take a photo first.");
      return;
    }
    setBusy(true);
    setError("");
    setMessage("Submitting today's photo...");
    const form = new FormData();
    form.set("promptKey", promptKey);
    form.set("photo", photo);
    form.set("staffName", staffName);
    try {
      if (isPreview) {
        const nextSlot = (status?.submissions.length || 0) + 1;
        setStatus((current) => current ? {
          ...current,
          submissions: [...current.submissions, {
            id: `preview-${nextSlot}`,
            slot: nextSlot,
            prompt_key: promptKey,
            status: "pending",
          }],
          requiredComplete: true,
          optionalComplete: nextSlot === 2,
          availablePrompts: current.availablePrompts.filter((item) => item.key !== promptKey),
        } : current);
        clearPhoto();
        setPromptKey("");
        setMessage(nextSlot === 1 ? "Photo sent. You're done!" : "Second photo sent. Thank you!");
        return;
      }
      const result = await apiJson("/api/staff-photo/submissions", { method: "POST", body: form });
      clearPhoto();
      setPromptKey("");
      setMessage(result.slot === 1 ? "Photo sent. You're done!" : "Second photo sent. Thank you!");
      await loadStatus();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not submit photo.");
      setMessage("");
    } finally {
      setBusy(false);
    }
  }

  async function submitIssue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const formElement = event.currentTarget;
    try {
      const form = new FormData(formElement);
      form.set("category", bossCategory);
      form.set("anonymous", String(identityChoice === "anonymous"));
      if (identityChoice === "named") form.set("staffName", staffName);
      else form.delete("staffName");
      const attachment = form.get("attachment");
      if (attachment instanceof File && attachment.size > 0) {
        form.set("attachment", await redrawImage(attachment));
      }
      if (!isPreview) await apiJson("/api/staff-photo/issues", { method: "POST", body: form });
      formElement.reset();
      setBossCategory("");
      setMessage(identityChoice === "anonymous"
        ? "Sent privately without your name on the report."
        : "Sent privately to the boss. Thank you for speaking up.");
      if (!isPreview) await loadStatus();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not send your message.");
    } finally {
      setBusy(false);
    }
  }

  function signOut() {
    const clear = () => {
      setAuthenticated(false);
      setStatus(null);
      setStaffName("");
      setActiveTab("photo");
    };
    if (isPreview) clear();
    else void apiJson("/api/staff-photo/auth", { method: "DELETE" }).then(clear);
  }

  if (!authKnown) {
    return <main className={styles.shell}><div className={styles.loading} role="status">Loading staff page...</div></main>;
  }

  if (!authenticated || !staffName) {
    return (
      <main className={styles.shell}>
        <section className={styles.loginCard} aria-labelledby="login-title">
          <div className={styles.brandMark}>AD</div>
          <p className={styles.eyebrow}>After Dark Cannabis</p>
          <h1 id="login-title">Ready for today&apos;s quick mission?</h1>
          <p className={styles.intro}>One useful photo. About 60 seconds. That&apos;s it.</p>
          <div className={styles.steps} aria-label="Three quick steps">
            <span><b>1</b>Enter PIN</span>
            <span><b>2</b>Snap photo</span>
            <span><b>3</b>Done</span>
          </div>
          <form onSubmit={login} className={styles.loginForm}>
            <label htmlFor="staff-name">Your name</label>
            <input id="staff-name" name="staffName" type="text" autoComplete="name" placeholder="First name is okay" required minLength={2} maxLength={60} />
            <label htmlFor="staff-pin">Today&apos;s 4-digit PIN</label>
            <input id="staff-pin" name="pin" type="password" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{4}" placeholder="••••" required minLength={4} maxLength={4} />
            <button className={styles.primaryButton} disabled={busy}>{busy ? "Checking..." : "Start today's mission →"}</button>
          </form>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <p className={styles.privacyNote}>🔒 Staff-only page. Photos stay private until reviewed.</p>
        </section>
      </main>
    );
  }

  const count = status?.submissions.length || 0;
  const canSubmit = count < 2;

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{status?.store.name}</p>
          <h1>Hi {staffName}</h1>
          <p>{status?.dayKey}</p>
        </div>
        <button className={styles.textButton} onClick={signOut}>Sign out</button>
      </header>

      <nav className={styles.tabs} aria-label="Staff page sections">
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "photo" ? styles.activeTab : ""}`}
          aria-current={activeTab === "photo" ? "page" : undefined}
          onClick={() => showTab("photo")}
        >
          📷 Photo task
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "boss" ? styles.activeTab : ""}`}
          aria-current={activeTab === "boss" ? "page" : undefined}
          onClick={() => showTab("boss")}
        >
          💬 Talk to Boss
        </button>
      </nav>

      {message && <div className={styles.success} role="status">✓ {message}</div>}
      {error && <div className={styles.error} role="alert">{error}</div>}

      {activeTab === "photo" ? (
        <>
          <section className={styles.card} aria-labelledby="photo-title">
            <div className={styles.cardHeading}>
              <div>
                <p className={styles.eyebrow}>Daily photo</p>
                <h2 id="photo-title">{status?.requiredComplete ? "Today's photo is done" : "Take one photo and send"}</h2>
              </div>
              <span className={status?.requiredComplete ? styles.doneBadge : styles.todoBadge}>{count} / 1</span>
            </div>
            {canSubmit ? (
              <>
                {status?.requiredComplete && <p className={styles.optionalNote}>Your required photo is complete. A second photo is optional.</p>}
                <label className={styles.field} htmlFor="shot-type">
                  <span>What are you taking?</span>
                  <select id="shot-type" value={promptKey} onChange={(event) => setPromptKey(event.target.value)}>
                    <option value="">Choose one...</option>
                    {status?.availablePrompts.map((prompt) => <option key={prompt.key} value={prompt.key}>{prompt.label}</option>)}
                  </select>
                </label>
                {!preview ? (
                  <>
                    <input ref={cameraRef} className={styles.hiddenInput} id="daily-camera" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={(event) => void choosePhoto(event.target.files?.[0])} />
                    <label className={`${styles.primaryButton} ${styles.cameraButton}`} htmlFor="daily-camera">📷 Take photo</label>
                    <p className={styles.hint}>Avoid customers, IDs, paperwork, licence plates and security screens.</p>
                  </>
                ) : (
                  <div className={styles.previewBlock}>
                    <img src={preview} alt="Preview of today's store photo" />
                    <div className={styles.actionRow}>
                      <button className={styles.secondaryButton} type="button" onClick={clearPhoto}>Retake</button>
                      <button className={styles.primaryButton} type="button" disabled={busy} onClick={() => void submitPhoto()}>{busy ? "Sending..." : "Send photo"}</button>
                    </div>
                  </div>
                )}
              </>
            ) : <p className={styles.completeText}>✓ Today&apos;s photos are complete.</p>}
          </section>

        </>
      ) : (
        <>
          <section className={`${styles.card} ${styles.bossHero}`} aria-labelledby="boss-title">
            <p className={styles.eyebrow}>Private owner inbox</p>
            <h2 id="boss-title">Talk to Boss</h2>
            <p>
              Got a concern, a smart idea, customer feedback, good news—or you just miss the boss terribly?
              This is the place. Serious thoughts are welcome. Slightly dramatic ones are allowed too.
            </p>
          </section>

          <section className={styles.card}>
            <p className={styles.promise}>
              Your message goes privately to the boss/owner Hub and is not posted in the staff chat.
              Respectful, honest feedback is welcome. The goal is to listen and improve—not to get staff in trouble.
            </p>

            <form className={styles.issueForm} onSubmit={submitIssue}>
              <label className={styles.field}>
                <span>What is this about?</span>
                <select value={bossCategory} onChange={(event) => setBossCategory(event.target.value)} required>
                  <option value="" disabled>Choose one...</option>
                  {BOSS_CATEGORIES.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label className={styles.field}>
                <span>Your message</span>
                <textarea name="note" rows={6} maxLength={1000} required placeholder="Tell the boss what's on your mind..." />
              </label>

              <label className={styles.field}>
                <span>Photo or screenshot <small>(optional)</small></span>
                <input name="attachment" type="file" accept="image/jpeg,image/png,image/webp" />
              </label>

              <fieldset className={styles.identityChoice}>
                <legend>How should this be sent?</legend>
                <label className={styles.identityOption}>
                  <input type="radio" name="identity" checked={identityChoice === "named"} onChange={() => setIdentityChoice("named")} />
                  <span><b>Include my first name</b><small>The boss will see “{staffName}” with this message.</small></span>
                </label>
                <label className={styles.identityOption}>
                  <input type="radio" name="identity" checked={identityChoice === "anonymous"} onChange={() => setIdentityChoice("anonymous")} />
                  <span><b>Send anonymously</b><small>Your name will be omitted from the report record.</small></span>
                </label>
              </fieldset>

              <button className={styles.primaryButton} disabled={busy}>{busy ? "Sending privately..." : "Send privately to Boss"}</button>
              <p className={styles.bossFootnote}>
                Anonymous removes your name from the message record. Please use this respectfully and include enough
                detail for the boss to understand.
              </p>
            </form>
          </section>
        </>
      )}
    </main>
  );
}
