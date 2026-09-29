import { YoutubeIcon } from "@/components/BrandIcons";
import PageHeader from "@/components/PageHeader";
import VideoCard from "@/components/VideoCard";
import PillButton from "@/components/PillButton";
import JsonLd from "@/components/JsonLd";
import FadeIn from "@/components/FadeIn";
import { WaveDivider } from "@/components/Waveform";
import { getContent, getPage } from "@/lib/content";
import { breadcrumbSchema, graph, videoSchemas } from "@/lib/jsonld";
import { pageMetadata, socialUrl } from "@/lib/site";

export async function generateMetadata() {
  const [page, { profile }] = await Promise.all([getPage("performances"), getContent()]);
  return pageMetadata(page.seo, profile);
}

export default async function PerformancesPage() {
  const { profile, videos } = await getContent();
  const { header, channelButtonLabel, closing } = await getPage("performances");
  const channel = socialUrl(profile, "youtube");

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([{ name: header.title, path: "/performances" }]),
          ...videoSchemas(videos),
        )}
      />

      <PageHeader
        eyebrow={header.eyebrow}
        title={header.heading}
        highlight={header.highlight}
        intro={header.intro}
        photo={header.photo}
        photoOptions={{
          position: "50% 50%",
          mobilePosition: "50% 50%",
          mobileAspect: "aspect-4/5 sm:aspect-[4/3]",
        }}
      >
        {channel && channelButtonLabel && (
          <PillButton href={channel} size="default" newTab>
            <YoutubeIcon size={16} />
            {channelButtonLabel}
          </PillButton>
        )}
      </PageHeader>

      <WaveDivider />

      <section className="px-6 pb-24 pt-4 sm:pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {videos.map((video, index) => (
              <FadeIn key={video.id} delay={index * 0.08}>
                <VideoCard video={video} />
              </FadeIn>
            ))}
          </div>

          {channel && closing && (
            <>
              <WaveDivider className="px-0 pb-4 pt-16" />
              <FadeIn className="flex flex-col items-center gap-5 text-center">
                <h2 className="display text-2xl font-bold">{closing.heading}</h2>
                <PillButton href={channel} newTab>
                  <YoutubeIcon size={18} />
                  {closing.buttonLabel}
                </PillButton>
              </FadeIn>
            </>
          )}
        </div>
      </section>
    </>
  );
}
