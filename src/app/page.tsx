import { client } from '@/libs/client';

// 型定義
type Work = {
  id: string;
  title: string;
  description: string;
  image: { url: string };
};

type Skill = {
  id: string;
  title: string;
  description: string;
  image: { url: string };
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

export default async function Page() {
  const { works, skills, about, contact } = await getPortfolioData();

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
        <p className="text-gray-500 text-sm">
          ユーザーとお客様がわかる成果できるサイトをお作りいたします。<br />
          デザインとコーディングはおまかせください。
        </p>
      </section>

      {/* Works */}
      <section id="works" className="bg-gray-100 py-16 px-6">
        <h3 className="text-center text-2xl font-bold mb-10">WORKS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {works.map((work: Work) => (
            <div key={work.id} className="bg-white p-4 shadow">
              <img
                src={work.image.url}
                alt={work.title}
                className="w-full h-[180px] object-cover mb-4"
              />
              <p className="text-sm font-semibold">{work.title}</p>
              <p className="text-xs text-gray-500">{work.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skill */}
      <section id="skill" className="py-16 px-6">
        <h3 className="text-center text-2xl font-bold mb-10">SKILL</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill: Skill) => (
            <div key={skill.id} className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 text-center pt-3 text-sm">約150%</div>
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
          <img src={about.image.url} alt="About" className="w-[300px] h-[300px] object-cover rounded-full" />
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{about.text}</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6">
        <h3 className="text-center text-2xl font-bold mb-6">CONTACT</h3>
        <p className="text-center text-sm text-gray-600 mb-4">お問い合わせは、SNSかメールにてお願いいたします。</p>
        <div className="text-center space-x-4 text-blue-500">
          <a href={contact.instagram} className="hover:underline">Instagram</a>
          <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-6 text-gray-400 border-t">©HANAE</footer>
    </div>
  );
}
