"use client";

interface ResumeRenderProps {
  jsonResume: string;
}

export const ResumeRender = ({ jsonResume }: ResumeRenderProps) => {
  let resume: any;
  try {
    resume = JSON.parse(jsonResume);
  } catch (e) {
    return;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold">{resume.basics.name}</h1>
        <p className="text-xl">{resume.basics.label}</p>
        {resume.basics?.image && (
          <img
            src={resume.basics.image}
            alt={resume.basics.name}
            className="w-24 h-24 mx-auto rounded-full my-4"
          />
        )}
        <div>
          <p>{resume.basics.email}</p>
          <p>{resume.basics.phone}</p>
          <a href={resume.basics.url} className="text-blue-600 hover:underline">
            {resume.basics.url}
          </a>
          <p>{resume.basics.summary}</p>
        </div>
      </header>

      {resume.work?.length && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Work Experience</h2>
          {resume.work.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-2xl font-semibold">
                {job.position} -{" "}
                <a href={job.url} className="text-blue-600 hover:underline">
                  {job.name}
                </a>
              </h3>
              <p className="text-sm">
                {job.startDate} - {job.endDate}
              </p>
              <p>{job.summary}</p>
              <ul>
                {job.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {resume.volunteer?.length > 0 && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Volunteer Work</h2>
          {resume.volunteer?.map((volunteer, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-2xl font-semibold">
                {volunteer.position} -{" "}
                <a
                  href={volunteer.url}
                  className="text-blue-600 hover:underline"
                >
                  {volunteer.organization}
                </a>
              </h3>
              <p className="text-sm">
                {volunteer.startDate} - {volunteer.endDate}
              </p>
              <p>{volunteer.summary}</p>
              <ul>
                {volunteer.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {resume.education?.length && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold">{edu.institution}</h3>
              <p className="text-sm">
                {edu.startDate} - {edu.endDate}
              </p>
              <p>
                {edu.area}, {edu.studyType}
              </p>
              <p>GPA: {edu.score}</p>
              <ul>
                {edu.courses.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {resume.awards?.length && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Awards</h2>
          {resume.awards.map((award, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-2xl font-semibold">{award.title}</h3>
              <p className="text-sm">{award.date}</p>
              <p>{award.awarder}</p>
              <p>{award.summary}</p>
            </div>
          ))}
        </section>
      )}

      {resume.certificates?.length && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Certificates</h2>
          {resume.certificates.map((certificate, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-2xl font-semibold">{certificate.name}</h3>
              <p className="text-sm">{certificate.date}</p>
              <a
                href={certificate.url}
                className="text-blue-600 hover:underline"
              >
                {certificate.issuer}
              </a>
            </div>
          ))}
        </section>
      )}

      {resume.publications?.length && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Publications</h2>
          {resume.publications.map((publication, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-2xl font-semibold">{publication.name}</h3>
              <p className="text-sm">{publication.releaseDate}</p>
              <a
                href={publication.url}
                className="text-blue-600 hover:underline"
              >
                {publication.publisher}
              </a>
              <p>{publication.summary}</p>
            </div>
          ))}
        </section>
      )}

      {resume.skills?.length && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Skills</h2>
          {resume.skills.map((skill, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold">
                {skill.name} ({skill.level})
              </h3>
              <ul className="flex flex-wrap">
                {skill.keywords.map((keyword, idx) => (
                  <li key={idx} className="mr-2">
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {resume.languages?.length && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Languages</h2>
          {resume.languages.map((language, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-2xl font-semibold">{language.language}</h3>
              <p>{language.fluency}</p>
            </div>
          ))}
        </section>
      )}

      {resume.projects?.length && (
        <section className="my-4">
          <h2 className="text-3xl font-semibold">Projects</h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-2xl font-semibold">{project.name}</h3>
              <p className="text-sm">
                {project.startDate} - {project.endDate}
              </p>
              <a href={project.url} className="text-blue-600 hover:underline">
                {project.url}
              </a>
              <p>{project.description}</p>
              <ul>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
