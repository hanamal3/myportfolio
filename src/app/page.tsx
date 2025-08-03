import { client } from '@/libs/client';
import Image from 'next/image';

// 型定義
type Work = {
  id: string;
  title: string;
  description: string;
  image: { url: string };
  link?: string; // オプションのリンク
};

type Skill = {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  image: { url: string }; // 画像が必要な場合は追加
};

type About = {
  id: string;
  text: string;
  image: { url: string };
};

type Contact = {
  id: string;
  instagram: string;
  email: string;
};

type Props = {
  works: Work[];
  skills: Skill[];
  about: About;
  contact: Contact;
};

async function getPortfolioData() {
  const works = await client.get({ endpoint: 'works' });
  console.log('Works:', works);
  const skills = await client.get({ endpoint: 'skills' });
  console.log('Skills:', skills);
  const about = await client.get({ endpoint: 'about' });
  console.log('About:', about);
  const contact = await client.get({ endpoint: 'contact' });

  return {
    works: works.contents,
    skills: skills.contents,
    about: about,
    contact: contact,
  };
}

// Skill用の色配列を定義
const skillColors = [
  'bg-red-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-indigo-200',
  'bg-teal-200',
  'bg-orange-200',
  'bg-gray-200',
];

export default async function Page() {
  const { works, skills, about, contact } = await getPortfolioData();
  const sortedSkills = [...skills].sort((a, b) => a.createdAt?.localeCompare(b.createdAt || '') || 0);

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-10 border-b">
        <h1 className="text-xl font-bold">HANAE</h1>
        <nav className="space-x-6">
          <a href="#works" className="hover:underline">WORKS</a>
          <a href="#skill" className="hover:underline">SKILL</a>
          <a href="#contact" className="hover:underline">CONTACT</a>
        </nav>
      </header>

      {/* Main Visual */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-extrabold mb-2">HANAE</h2>
        <p className="text-sm tracking-widest mb-4">PORTFOLIO</p>
        {/* <p className="text-gray-500 text-sm">
          ユーザーとお客様がわかる成果できるサイトをお作りいたします。<br />
          デザインとコーディングはおまかせください。
        </p> */}
      </section>

      {/* Works */}
      <section id="works" className="bg-gray-100 py-16 px-6">
        <h3 className="text-center text-2xl font-bold mb-10">WORKS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {works.map((work: Work) => (
            <div key={work.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <Image
                src={work.image.url}
                alt={work.title}
                width={400}
                height={180}
                unoptimized
                className="w-full h-[180px] object-cover mb-4"
              />
              <p className="text-sm font-semibold">{work.title}</p>
              <p className="text-xs text-gray-500">{work.description}</p>
              {work.link && (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-xs underline mt-2 block self-end"
                >
                  サイトを見る
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skill */}
      <section id="skill" className="py-16 px-6">
        <h3 className="text-center text-2xl font-bold mb-10">SKILL</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sortedSkills.map((skill: Skill, i: number) => (
            <div key={skill.id} className="flex items-start space-x-4">
              <div
                className={`rounded-full ${skillColors[i % skillColors.length]} 
    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0`}
              ></div>
              <div>
                <h4 className="font-semibold mb-1">{skill.title}</h4>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-gray-100 py-16 px-6">
        <h3 className="text-center text-2xl font-bold mb-10">ABOUT</h3>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <Image
            src={about.image.url}
            alt="About"
            width={300}
            height={300}
            className="w-[300px] h-[300px] object-cover rounded-full"
          />
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: about.text }}
          />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6">
        <h3 className="text-center text-2xl font-bold mb-6">CONTACT</h3>
        <p className="text-center text-sm text-gray-600 mb-4">お問い合わせは、SNSかメールにてお願いいたします。</p>
        <div className="text-center space-x-4 text-blue-500">
          {contact.instagram && (
            <a href={contact.instagram} className="hover:underline">Instagram</a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-6 text-gray-400 border-t">©HANAE</footer>
    </div>
  );
}
